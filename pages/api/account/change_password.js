import { getSession } from "next-auth/react";
import Joi from "joi";

import apiHandler from "helpers/api/globalApiHandler";
import { encryptPassword } from "@/utils/password";
import joiValidationHelper from "helpers/api/validation";
import { sendMailWithSendGrid } from "@/utils/send-email";
import { User } from "@/lib/database/connection";

const changePasswordSchema = Joi.object({
  new_password: Joi.string().required()
});

const changePassword = async (req, res) => {
  const { new_password } = req.body;

  const validationErr = joiValidationHelper(changePasswordSchema, req.body);
  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Please set a new password."
    });
  }

  const session = await getSession({ req });
  const user = await User.findOne({
    where: {
      uuid: session.user.uuid
    }
  });
  await user.update({
    password: await encryptPassword(new_password)
  });

  await sendMailWithSendGrid("change_password", {
    email: user.email,
    first_name: user.dataValues.first_name
  });

  return res.json({
    success: true,
    message: "Password changed successfully"
  });
};

export default apiHandler({
  post: [changePassword, true]
});
