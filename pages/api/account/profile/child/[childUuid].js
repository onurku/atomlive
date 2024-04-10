import { getSession } from "next-auth/react";
import Joi from "joi";

import apiHandler from "helpers/api/globalApiHandler";
import joiValidationHelper from "helpers/api/validation";
import { sequelize } from "@/lib/database/connection";

const getChildSchema = Joi.object({
  childUuid: Joi.string().required()
});

const getChild = async (req, res) => {
  const session = await getSession({ req });
  console.log("getChild:", req.query);

  const validationErr = joiValidationHelper(getChildSchema, req.query);
  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Please check the child uuid"
    });
  }

  const { childUuid } = req.query;

  const child = await sequelize.query(
    "SELECT childs.* from childs,users WHERE childs.uuid = ? AND childs.parent_0_id = users.id AND users.uuid = ? LIMIT 1",
    {
      replacements: [childUuid, session.user.uuid],
      raw: true,
      plain: true
    }
  );
  console.log(child);
  if (child === null) {
    return res.status(401).json({
      success: false,
      message: "No child was found."
    });
  }

  delete child.id;
  return res.json(child);
};

export default apiHandler({
  get: [getChild, true]
});
