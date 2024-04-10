import Joi from "joi";
import { getSession } from "next-auth/react";

import apiHandler from "@/helpers/api/globalApiHandler";
import joiValidationHelper from "@/helpers/api/validation";
import { getVerificationLink } from "@/helpers/api/email/getVerificationLink";
import { sendMailWithSendGrid } from "@/utils/send-email";
import { User } from "@/lib/database/connection";

const changeEmailSchema = Joi.object({
  new_email: Joi.string().email().required()
});

const changeEmail = async (req, res) => {
  const { new_email } = req.body;
  const session = await getSession({ req });

  const validationErr = joiValidationHelper(changeEmailSchema, req.body);
  if (validationErr !== undefined) {
    console.log("Registration Validation Err:", validationErr);
    return res.status(400).json({ success: false, message: validationErr });
  }
  const userEmailExists = await User.findOne({
    where: {
      email: new_email
    }
  });

  if (userEmailExists) {
    return res.status(400).json({
      success: false,
      message: `Account with email address ${new_email} already exists. If you own this account, try to login or reset the password.`
    });
  }

  const userObj = await User.findOne({
    where: {
      uuid: session.user.uuid
    }
  });

  if (userObj.dataValues.email === new_email) {
    return res
      .status(400)
      .json({ success: false, message: "Old Email same as new" });
  }

  const verificationData = await getVerificationLink(session.user.uuid);

  // TO DO: need to check if the email exists in database before making an update.
  await userObj.update({
    is_email_verified: false,
    email_verification_code: verificationData.code,
    email: new_email
  });

  await sendMailWithSendGrid("account_verify", {
    email: new_email,
    email_verification_link: verificationData.verificationLink,
    first_name: userObj.dataValues.first_name
  });

  return res.json({
    success: true,
    message: "A verification link has been sent to your email"
  });
};

export default apiHandler({
  post: [changeEmail, true]
});
