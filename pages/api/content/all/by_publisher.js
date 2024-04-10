import Joi from "joi";
import joiValidationHelper from "@/helpers/api/validation";
const { Op } = require("sequelize");
import { Content } from "@/lib/database/connection";
import apiHandler from "helpers/api/globalApiHandler";

const schema = Joi.object({
  publisher_uuid: Joi.string(),
  publisher_name: Joi.string()
}).min(1);

const capitalize = (publisherName) => {
  if (!publisherName.includes("-") && !publisherName.includes("_")) {
    return `${publisherName.charAt(0).toUpperCase()}${publisherName.slice(1)}`;
  }

  let publisher;
  if (publisherName.includes("-")) {
    publisher = publisherName.split("-");
  }

  if (publisherName.includes("_")) {
    publisher = publisherName.split("_");
  }

  const formatted = publisher.map(
    (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  );

  return formatted.join(" ");
};

const getContentByPublisher = async (req, res) => {
  // console.log("getContentByPublisher", req.query);
  const { publisher_name, publisher_uuid } = req.query;
  console.log("publisher_name======", publisher_name);

  const validationErr = joiValidationHelper(schema, req.query);

  if (validationErr !== undefined) {
    return res.status(400).json({
      success: false,
      message: "Either publisher name or publisher uuid is required"
    });
  }

  let attributes = {};
  if (publisher_name) {
    attributes.publisher_name = capitalize(publisher_name);
  }
  if (publisher_uuid) {
    attributes.publisher_uuid = publisher_uuid;
  }

  console.log("attributes ====", attributes);

  let content = await Content.findAll({
    where: attributes,
    attributes: { exclude: ["id"] }
  });

  return res.status(200).json({ success: true, data: content || {} });
};

export default apiHandler({
  get: [getContentByPublisher, false]
});
