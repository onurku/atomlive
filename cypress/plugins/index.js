/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// import { Sequelize } from "sequelize";

require("dotenv").config({ path: "./.env.local" });
// const UserModel = require("../../lib/database/models/user");

function createUserModel(sequelize, type) {
  return sequelize.define(
    "User",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      is_active: {
        type: type.BOOLEAN,
        defaultValue: true
      },
      is_email_verified: {
        type: type.BOOLEAN,
        defaultValue: false
      },
      about: {
        type: type.STRING(100)
      },
      city: {
        type: type.STRING(20)
      },
      country: {
        type: type.STRING(20)
      },
      email: {
        type: type.STRING(40),
        allowNull: false,
        unique: true
      },
      email_verification_code: {
        type: type.STRING(50)
      },
      first_name: {
        type: type.STRING(40)
      },
      last_name: {
        type: type.STRING(40)
      },
      metadata_timezone: {
        type: type.JSON
      },
      organization_id: {
        type: type.INTEGER
      },
      password: {
        type: type.STRING(100)
      },
      phone: {
        type: type.TEXT
      },
      phone_verified: {
        type: type.BOOLEAN
      },
      photo_url: {
        type: type.STRING(100)
      },
      reset_password_code: {
        type: type.STRING(50)
      },
      timezone: {
        type: type.STRING(50)
      },
      title: {
        type: type.STRING(10)
      },
      uuid: {
        type: type.UUID
      },
      last_login_time: {
        type: type.DATE
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "modified_at",
      tableName: "users"
    }
  );
}

const Sequelize = require("sequelize");
// const { User, Child } = require("../../lib/database/connection");
const url = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const sequelize = new Sequelize(url, {
  logging: false
});

const User = createUserModel(sequelize, Sequelize);
const dummyUser = {
  first_name: "Test",
  last_name: "User",
  email: "abhishekr700+test@gmail.com",
  password: "$2b$10$Y8aIjKvSbxzpRLrD3IIfauTHsjHzLZcBrs3zHHCXxrHmE6xDSFela",
  password_plain: "123456",
  uuid: "146d0305-9f4c-4cdc-8af5-81f45dd88d89",
  email_verification_code: "664685e1",
  new_email: "abhishekr700+change@gmail.com"
};
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("task", {
    async "db:clear"() {
      console.log("=> db:clear started");
      let user = await sequelize.query(
        "SELECT * from users WHERE email='abhishekr700+test@gmail.com'",
        { raw: true }
      );
      if (user.length === 0) {
        return null;
      }
      user = user[0][0];
      console.log(user);
      if (user === undefined) {
        return null;
      }

      await sequelize.query("DELETE from users WHERE id=?", {
        replacements: [user.id]
      });
      return null;
    },

    async "db:dummyUser"() {
      const userObj = { ...dummyUser };
      delete userObj.new_email;
      delete userObj.password_plain;
      const user = await User.create(userObj);
      return user;
    },

    async getTestUser() {
      return dummyUser;
    },

    async "db:getUser"(email) {
      console.log("=> db:getUser", email);
      const user = await User.findOne({
        where: { email: email },
        raw: true
      });
      return user;
    },

    async "db:removeUser"(email) {
      await sequelize.query("DELETE from users WHERE email=?", {
        replacements: [email]
      });
      return null;
    },

    async "db:setUserEmailVerified"(email) {
      console.log("db:setUserEmailVerified", email);
      await sequelize.query(
        "UPDATE users SET is_email_verified=true WHERE email=?",
        {
          replacements: [email]
        }
      );
      return null;
    },

    async "db:setUserEmailUnverified"(email) {
      await sequelize.query(
        "UPDATE users SET is_email_verified=false WHERE email=?",
        {
          replacements: [email]
        }
      );
      return null;
    }
  });
};
