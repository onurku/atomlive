import Joi from "joi";

import { User } from "@/lib/database/connection";
import { sendMailWithSendGrid } from "@/utils/send-email";
import apiHandler from "helpers/api/globalApiHandler";
import { getSession } from "next-auth/react";
import { getVerificationLink } from "helpers/api/email/getVerificationLink";
import joiValidationHelper from "helpers/api/validation";

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

const verifyEmail = async (req, res) => {
  const session = await getSession({ req });

  let userObj = await User.findOne({
    where: { uuid: session.user.uuid }
  });

  if (userObj) {
    if (userObj.is_email_verified) {
      return res.json({ success: true, message: "Email Verified" });
    }

    // this verification link should be a frontend page
    const verificationData = await getVerificationLink(session.user.uuid);
    const verificationLink = verificationData.verificationLink;
    const code = verificationData.code;

    await userObj.update({
      email_verified: false,
      email_verification_code: code
    });

    const user = {
      email: userObj.email,
      email_verification_link: verificationLink,
      first_name: userObj.dataValues.first_name
    };

    await sendMailWithSendGrid("account_verify", user);

    return res.json({
      success: true,
      message: "A verification link has been sent to your email"
    });
  }
};

export default apiHandler({
  get: [verifyEmail, true]
});
