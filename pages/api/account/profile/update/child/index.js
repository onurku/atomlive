// import Joi from "joi";
const Joi = require("joi").extend(require("@joi/date"));
const { Op } = require("sequelize");
import { v4 } from "uuid";

import apiHandler from "@/helpers/api/globalApiHandler";
import { getSession } from "next-auth/react";
import { getCompleteUserProfile } from "@/helpers/api/users";
import joiValidationHelper from "@/helpers/api/validation";
import { User, Child } from "@/lib/database/connection";

const uuidv4 = v4;

const addChildSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  date_of_birth: Joi.date().format("YYYY-MM-DD").less("now")
});

// const updateChildSchema = Joi.object({
//   childUuid: Joi.string().required(),
//   first_name: Joi.string()
// });

const addChild = async (req, res) => {
  const { body } = req;
  console.log("body", body);
  const validationErr = joiValidationHelper(addChildSchema, body);
  console.log(validationErr);
  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Please double check these input fields"
    });
  }

  const { first_name, last_name, age, grade, date_of_birth } = body;
  const session = await getSession({ req });
  const user = await User.findOne({
    where: {
      uuid: session.user.uuid
    },
    raw: true
  });

  const childObj = {
    first_name,
    last_name,
    grade,
    date_of_birth,
    parent_0_id: user.id,
    uuid: uuidv4()
  };
  const child = await Child.create(childObj);
  console.log("addChild:", child);
  const retChild = child.dataValues;
  delete retChild.id;
  delete retChild.parent_0_id;
  delete retChild.parent_1_id;

  const returnObj = await getCompleteUserProfile(session.user.uuid);
  return res.json({
    success: true,
    message: "Child has been added",
    data: returnObj
  });
};

const updateChild = async (req, res) => {
  // const validationErr = joiValidationHelper(updateChildSchema, req.body);
  // if (validationErr !== undefined) {
  //   return res.status(400).json({
  //     status: false,
  //     error: validationErr,
  //     message: "Please double check these input fields"
  //   });
  // }
  const session = await getSession({ req });

  const { childUuid } = req.body;
  if (childUuid === undefined || childUuid === null) {
    return res.status(400).json({
      success: false,
      message: "'childUuid' is undefined or null"
    });
  }

  const user = await User.findOne({
    where: {
      uuid: session.user.uuid
    },
    raw: true,
    attributes: ["id"]
  });

  if (user === null) {
    return res.status(500).json({
      success: false,
      message: "The user information is unavailable."
    });
  }

  const allowedFields = ["first_name", "last_name", "grade", "date_of_birth"];

  const newData = {};
  for (const k in req.body) {
    if (allowedFields.includes(k) && k in req.body) {
      newData[k] = req.body[k];
    }
  }

  const child = await Child.findOne({
    where: {
      [Op.or]: {
        parent_0_id: user.id,
        parent_1_id: user.id
      },
      uuid: childUuid
    }
  });
  if (child === null) {
    return res.status(400).json({
      success: false,
      message: "Please check the childUuid. No child was found"
    });
  }
  console.log({ user, child });

  await child.update(newData);

  const returnObj = await getCompleteUserProfile(session.user.uuid);
  return res.json({
    success: true,
    message: "The child has been updated",
    data: returnObj
  });
};

const deleteChild = async (req, res) => {
  const session = await getSession({ req });

  const { childUuid } = req.body;
  console.log("childUuid", childUuid);

  if (childUuid === undefined || childUuid === null) {
    return res.status(400).json({
      success: false,
      message: "'childUuid' is undefined or null"
    });
  }

  const user = await User.findOne({
    where: {
      uuid: session.user.uuid
    },
    raw: true,
    attributes: ["id"]
  });

  if (user === null) {
    return res.status(500).json({
      success: false,
      message: "The user information is unavailable."
    });
  }

  const child = await Child.findOne({
    where: {
      [Op.or]: {
        parent_0_id: user.id,
        parent_1_id: user.id
      },
      uuid: childUuid
    }
  });

  if (child === null) {
    return res.status(400).json({
      success: false,
      message: "Please check the childUuid. No child was found",
      data: returnObj
    });
  }
  await child.destroy();
  const returnObj = await getCompleteUserProfile(session.user.uuid);
  return res.json({
    success: true,
    message: "The Child has been deleted",
    data: returnObj
  });
};

export default apiHandler({
  post: [addChild, true],
  patch: [updateChild, true],
  delete: [deleteChild, true]
});
