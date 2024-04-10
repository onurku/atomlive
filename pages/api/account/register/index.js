import { encrypt, randomChars } from "@/utils/crypto";
import sendEmail from "@/utils/send-email";
import formatResponse from "@/utils/api-hooks/useResponse";
import { User, Role, UserRoleMap, sequelize } from "@/lib/database/connection";
import passwordManager from "@/utils/password";
import Joi from "joi";
import { encryptPassword } from "@/utils/password";
import { sendMailWithSendGrid } from "@/utils/send-email";
import useTimezone from "@/utils/api-hooks/useTimezone";
import { v4 } from "uuid";
const uuidv4 = v4;

const registerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  policy: Joi.boolean().invalid(false).required(),
  role: Joi.string()
});

const joiValidationHelper = (schema, body) => {
  const bodyObj = Object(body);
  const validationResult = schema.validate(bodyObj);
  return validationResult.error === undefined
    ? undefined
    : validationResult.error.details[0].message;
};

const register = async (req, res) => {
  let { first_name, last_name, email, password, policy, role } = req.body;

  if (!policy) {
    return res.status(401).json({
      success: false,
      message: "Must agree to terms of service."
    });
  }

  const validationErr = joiValidationHelper(registerSchema, req.body);
  if (validationErr !== undefined) {
    console.log("Registration Validation Err:", validationErr);
    return res.status(401).json({
      success: false,
      error: validationErr,
      message: "Please double check registration fields"
    });
  }

  try {
    // Check exisitng user
    let existingUser = await User.findOne({
      where: { email: email }
    });
    if (existingUser) {
      existingUser = existingUser.get({ raw: true });
      if (existingUser.authorization_provider === "google") {
        return res.status(401).json({
          success: false,
          message: "Email previously registered with Google. Use Google Sign"
        });
      }
      return res.status(401).json({
        success: false,
        message: "Email previously registered. Sign In."
      });
    }

    // Verify valid role
    if (!role) {
      role = "parent";
    }

    const roleData = await Role.findOne({
      where: { role: role }
    });

    console.log("roleData", roleData);

    if (!roleData) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const uuid = uuidv4();
    let userObj = {
      uuid: uuid,
      email: email,
      password: await encryptPassword(password),
      first_name: first_name,
      last_name: last_name,
      is_active: true,
      last_login_time: new Date()
    };

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
    const { encryptedData } = encrypt(new Date().toISOString());
    const code = randomChars(encryptedData, 8);

    userObj.email_verification_code = code;

    const t = await sequelize.transaction();
    let createdUser;
    try {
      // Start Transaction to insert Both User & UserDataMapping entries
      createdUser = await User.create(userObj, { transaction: t });

      // Creating Role Mapping
      await UserRoleMap.create(
        {
          user_id: createdUser.dataValues.id,
          role_id: roleData.id
        },
        { transaction: t }
      );

      await t.commit();
    } catch (e) {
      await t.rollback();
      return res.status(500).end();
    }

    res.json({
      success: true,
      message: "Registration Success"
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_VERCEL_URL}account/verify?code=${code}&uuid=${uuid}`;

    createdUser.dataValues.email_verification_link = verificationLink;

    await createdUser.update({
      email_verified: false,
      email_verification_code: code
    });
    await sendMailWithSendGrid("account_verify", {
      email: userObj.email,
      email_verification_link: verificationLink,
      first_name: first_name
    });
  } catch (error) {
    console.log("/api/account/register error", error);

    return res
      .status(400)
      .json({ success: false, error: error, message: "sending email error" });
  }
};

export default function handler(req, res) {
  if (req.method === "POST") {
    return register(req, res);
  }

  res.status(404).end();
}
