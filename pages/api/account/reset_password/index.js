import Joi from "joi";

import apiHandler from "helpers/api/globalApiHandler";
import { encryptPassword } from "@/utils/password";
import { getResetPasswordLink } from "helpers/api/email/getVerificationLink";
import joiValidationHelper from "helpers/api/validation";
import { sendMailWithSendGrid } from "@/utils/send-email";
import { User } from "@/lib/database/connection";

// Send email for reset password
const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.query;

  const sendResetPasswordEmailSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .error(() => {
        return {
          message: "Email is required."
        };
      })
  });

  console.log("sendResetPasswordEmail", email);
  const validationErr = joiValidationHelper(
    sendResetPasswordEmailSchema,
    req.query
  );

  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Please check the email field"
    });
  }

  let user = await User.findOne({
    where: { email: email }
  });

  console.log("lookup", user);

  if (user === null) {
    return res.json({
      success: false,
      message:
        "Email is invalid! Please check the email where you requested to change password"
    });
  }

  const resetPassData = await getResetPasswordLink(user.dataValues.uuid);
  await user.update({ reset_password_code: resetPassData.code });
  await sendMailWithSendGrid("reset_password", {
    email: user.dataValues.email,
    reset_password_link: resetPassData.resetPassLink
  });

  return res.json({
    success: true,
    message:
      "An email contanining the link to reset password has been sent to you."
  });
};

const resetUserPassword = async (req, res) => {
  const resetUserPasswordSchema = Joi.object({
    code: Joi.string().required().label("code"),
    uuid: Joi.string().required(),
    new_password: Joi.string().required().label("new password")
  });
  const validationErr = joiValidationHelper(resetUserPasswordSchema, req.body);
  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Please check your passwords"
    });
  }

  const { code, uuid, new_password } = req.body;

  const user = await User.findOne({
    where: {
      uuid: uuid
    }
    // attributes: ["reset_password_code"]
  });

  const savedCode = user.dataValues.reset_password_code;
  if (savedCode === null || savedCode === undefined || savedCode === "") {
    return res.status(400).json({
      success: false,
      message: "You did not create a reset password request."
    });
  }

  if (code !== user.dataValues.reset_password_code) {
    return res.json({
      success: false,
      message: "Code Invalid"
    });
  }

  await user.update({
    password: await encryptPassword(new_password),
    reset_password_code: null
  });

  return res.json({
    success: true,
    message: "Your password has been changed"
  });
};

export default apiHandler({
  post: [resetUserPassword, false]
});
