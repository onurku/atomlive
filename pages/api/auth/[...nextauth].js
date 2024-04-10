import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import useTimezone from "@/utils/api-hooks/useTimezone";
import { v4 as uuidv4 } from "uuid";

import { encryptPassword, matchPassword } from "@/utils/password";
import {
  User,
  UserRoleMap,
  VerificationToken,
  Account,
  sequelize
} from "@/lib/database/connection";

function MyAdapter() {
  let _synced = false;

  const sync = async () => {
    if (!_synced) {
      const syncOptions =
        typeof synchronize === "object" ? synchronize : undefined;

      await Promise.all([User.sync(syncOptions), Account.sync(syncOptions)]);

      _synced = true;
    }
  };

  let userAdapter;
  return {
    async createUser(user) {
      console.log("createUser", user);
      user.uuid = uuidv4();
      user.is_email_verified = true;
      return await user;
    },

    async getUser(id) {
      console.log("getUser:", id);
      const userInstance = await User.findByPk(id);
      return userInstance?.get({ plain: true }) ?? null;
    },

    async getUserByEmail(email) {
      const userInstance = await User.findOne({
        where: { email }
      });
      return userInstance?.get({ plain: true }) ?? null;
    },

    async getUserByAccount(account) {
      // await sync();
      const { provider, providerAccountId } = account;
      console.log("getUserByAccount", account);
      const accountInstance = await Account.findOne({
        where: { provider, providerAccountId }
      });

      if (!accountInstance) {
        return null;
      }
      const userInstance = await User.findOne({
        where: { uuid: accountInstance.userId }
      });

      userAdapter = userInstance?.get({ plain: true }) ?? null; //save as top level var
      return userInstance?.get({ plain: true }) ?? null;
    },

    async updateUser(user) {
      console.log("updateUser:", user);
      await User.update(user, { where: { id: user.id } });
      const userInstance = await User.findByPk(user.id);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return userInstance;
    },
    async deleteUser(userId) {
      throw new Error("deleteUser not implemented");
    },
    async linkAccount(account) {
      console.log("linkAccount adapterxxxxxxxxxxxxxxxxx", account);
      // await sync();

      //await Account.create(account);
    },
    async unlinkAccount({ provider, providerAccountId }) {
      throw new Error("unlinkAccount not implemented");
      await Account.destroy({
        where: { provider, providerAccountId }
      });
    },
    async createSession(session) {
      return await Session.create(session);
    },
    async getSessionAndUser(sessionToken) {
      console.log("getSessionAndUser");
      const sessionInstance = await Session.findOne({
        where: { sessionToken }
      });

      if (!sessionInstance) {
        return null;
      }

      const userInstance = await User.findByPk(sessionInstance.userId);

      if (!userInstance) {
        return null;
      }

      return {
        session: sessionInstance?.get({ plain: true }),
        user: userInstance?.get({ plain: true })
      };
    },
    async updateSession({ sessionToken, expires }) {
      console.log("updateSession:");

      await Session.update(
        { expires, sessionToken },
        { where: { sessionToken } }
      );

      return await Session.findOne({ where: { sessionToken } });
    },
    async deleteSession(sessionToken) {
      await Session.destroy({ where: { sessionToken } });
    },
    async createVerificationToken(token) {
      return await VerificationToken.create(token);
    },
    async useVerificationToken({ identifier, token }) {
      console.log("useVerificationToken:", { identifier, token });
      const tokenInstance = await VerificationToken.findOne({
        where: { identifier, token }
      });

      await VerificationToken.destroy({ where: { identifier } });

      return tokenInstance?.get({ plain: true }) ?? null;
    }
  };
}
const adapter = MyAdapter();

export default NextAuth({
  // TODO: Make these read from config file in production
  secret: "somerandomsecret1",
  jwt: {
    // A secret to use for key generation. Defaults to the top-level `session`.
    secret: "qwertghjkl"
  },
  // database: sequelize,
  adapter: adapter,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // console.log("JWT Callback", token, user, account);

      if (user) {
        console.log("JWT One Time Work");
        // Do stuff only for once
        let userObj = await User.findOne({
          where: {
            email: token.email
          }
        });

        if (userObj) {
          userObj = userObj.get({ plain: true });
          token.persistUserData = {
            uuid: userObj.uuid,
            is_email_verified: userObj.is_email_verified
          };
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log("Session CB:", session, token, user);
      delete session.user;
      session.user = {
        email: token.email,
        ...token.persistUserData
      };
      // session.user.uuid = token.uuid;
      // session.user.is_email_verified = token.is_email_verified;
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn CB:", { user, account, profile, email, credentials });

      if (account.provider === "google") {
      } else {
        await user.update({
          last_login_time: new Date()
        });
      }
      return true;
    }
  },
  events: {
    async createUser({ user }) {
      console.log("createUser event", user);
    },
    async linkAccount({ user, account, profile }) {
      console.log("linkAccount event", user, account, profile);

      let userObj = await User.findOne({
        where: { email: user.email }
      });

      const { providerAccountId, provider } = account;
      let accountObj = await Account.findOne({
        where: {
          providerAccountId,
          provider
        }
      });
      let createdAccount, createdUser;
      console.log(
        "check user, check account",
        userObj,
        accountObj,
        !userObj,
        !accountObj
      );
      const uuidV4 = uuidv4();
      if (!userObj) {
        console.log("user not found, let's create user");

        userObj = {
          authorization: account,
          authorization_provider: provider,
          uuid: uuidV4,
          email: user.email,
          is_email_verified: true,
          first_name: user.name.split(" ").slice(0, 1).join(""),
          last_name: user.name.split(" ").slice(1).join(" "),
          is_active: true,
          photo_url: user.image,
          last_login_time: new Date()
        };

        console.log("user, account 0", userObj, accountObj);

        if (!accountObj) {
          accountObj = {
            ...account,
            userId: uuidV4
          };
          createdAccount = await Account.create(accountObj);
          createdAccount = createdAccount.get({ plain: true });
        } else {
          accountObj.userId = uuidV4;
          console.log("user, account 1", userObj, accountObj);
          createdAccount = await accountObj.update();

          createdAccount = createdAccount.get({ plain: true });
        }

        console.log("created account", createdAccount);
        // TODO: Need to detect IP using https://www.npmjs.com/package/request-ip and pass it to the endpoint
        // https://stackoverflow.com/questions/68338838/how-to-get-the-ip-address-of-the-client-from-server-side-in-next-js-app
        const tz = await useTimezone();
        if (tz.success && tz.timezone && tz.timezone.data) {
          if (tz.timezone.data.country) {
            userObj.country = tz.timezone.data.country;
          }
          if (tz.timezone.data.timezone) {
            userObj.timezone = tz.timezone.data.timezone.id;
          }
          if (tz.timezone.data.city) {
            userObj.city = tz.timezone.data.city;
          }
          if (tz.timezone.data.timezone) {
            userObj.metadata_timezone = tz.timezone.data;
          }
        }
        createdUser = await User.create(userObj);
        createdUser = createdUser.get({ plain: true });
      } else {
        userObj = userObj.get({ plain: true });

        if (!accountObj) {
          accountObj = {
            ...account,
            userId: userObj.uuid
          };
          createdAccount = await Account.create(accountObj);
          createdAccount = createdAccount.get({ plain: true });
        } else {
          if (!account.userId) {
            console.log("updating user uuid");
            accountObj.userId = userObj.uuid;
            createdAccount = await accountObj.update();

            createdAccount = createdAccount.get({ plain: true });
          }
        }
      }
      console.log("created User and Account", userObj, createdAccount);
      return createdAccount;
    }
  },
  providers: [
    CredentialsProvider({
      name: "Sign with email password",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        console.log("Authorize", credentials);
        try {
          const user = await User.findOne({
            where: {
              email: credentials.email
            }
          });
          console.log("User", user.dataValues);
          const passMatch = await matchPassword(
            credentials.password,
            user.dataValues.password
          );
          console.log("Pass Match:", { passMatch });
          if (passMatch) {
            return user;
          }
          return null;
        } catch (e) {
          console.log("CredentialProvider Authorize Err:", e);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // },
      // checks: "both"
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD
        }
      },
      from: process.env.SENDGRID_EMAIL
    })
  ]
});
