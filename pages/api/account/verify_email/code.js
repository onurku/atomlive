import Joi from "joi";

import apiHandler from "helpers/api/globalApiHandler";
import joiValidationHelper from "helpers/api/validation";
import { User } from "@/lib/database/connection";

const verifyEmailCodeSchema = Joi.object({
  code: Joi.string().required(),
  uuid: Joi.string().uuid().required()
});

const verifyEmailCode = async (req, res) => {
  const { code, uuid } = req.query;

  const validationErr = joiValidationHelper(verifyEmailCodeSchema, req.query);
  if (validationErr !== undefined) {
    return res.status(400).json({
      success: false,
      error: validationErr,
      message: "Please double check input fields"
    });
  }

  const userObj = await User.findOne({
    where: {
      uuid: uuid
    }
  });

  if (userObj) {
    let user = userObj.get({ raw: true });

    if (user.email_verified)
      return res.json({
        success: true,
        message: "Your email has been verified!"
      });

    if (user.email_verification_code !== code)
      return res.json({
        success: false,
        message: "Incorrect verification code!"
      });

    await userObj.update({
      is_email_verified: true,
      email_verification_code: ""
    });

    return res.json({
      success: true,
      message: "Your email has been verified"
    });
  }
};

export default apiHandler({
  get: [verifyEmailCode, false]
});
