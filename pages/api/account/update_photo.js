import apiHandler from "helpers/api/globalApiHandler";
import aws from "aws-sdk";
import formidable from "formidable";
import fs from "fs";
import { getSession } from "next-auth/react";
import path from "path";
import { User, Child } from "@/lib/database/connection";

const { Op } = require("sequelize");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ATOM,
  secretAccessKey: process.env.AWS_SECRET_KEY_ATOM,
  region: process.env.AWS_REGION,
  signatureVersion: "v4"
});

const s3 = new aws.S3();

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const session = await getSession({ req });
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    console.log("Update Photo: ", fields, files);
    try {
      let forChild;
      if (fields.for_child === "true" || fields.for_child === true) {
        forChild = true;
      } else if (fields.for_child === "false" || fields.for_child === false) {
        forChild = false;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid value for for_child"
        });
      }
      if (forChild && fields.child_uuid === undefined) {
        return res.status(400).json({
          success: false,
          message: "Child uuid must be sent if for_child is true"
        });
      }
      const user = await User.findOne({
        where: {
          uuid: session.user.uuid
        },
        attributes: ["id", "uuid"]
      });

      if (user === null) {
        return res.status(500).json({
          success: false,
          message: "The user information is unavailable."
        });
      }

      let uuidToUpdate = session.user.uuid;
      let child;

      if (forChild) {
        child = await Child.findOne({
          where: {
            [Op.or]: {
              parent_0_id: user.id,
              parent_1_id: user.id
            },
            uuid: fields.child_uuid
          }
        });

        if (child === null) {
          return res.status(400).json({
            success: false,
            message: "Please check the child uuid. No child was found"
          });
        }
        uuidToUpdate = fields.child_uuid;
      }

      console.log({ files });
      if (files.photo === undefined) {
        return res.status(400).json({
          success: false,
          message: "Photo is missing"
        });
      }
      const photoURL = await saveFile(files.photo, uuidToUpdate);
      if (forChild) {
        await child.update({
          photo_url: photoURL
        });
      } else {
        await user.update({
          photo_url: photoURL
        });
      }
      return res.status(201).send({
        success: true,
        message: "Photo has been updated.",
        data: photoURL
      });
    } catch (e) {
      console.log(e);
      return res.status(500).end();
    }
  });
};

const saveFile = async (file, uuid) => {
  console.log("saveFile:", __dirname, file);
  const photoFolder = "temp/";
  const dir = path.resolve("./assets", photoFolder);
  const data = fs.readFileSync(file.filepath);

  fs.writeFileSync(`${dir}/${file.originalFilename}`, data, (err) => {
    if (err) {
      return console.log("file error", err);
    }
    console.log("The photo was saved!");
  });

  await fs.unlinkSync(file.filepath);

  let uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uuid,
    Body: data,
    // ACL: "public-read",
    ContentType: file.mimetype
  };

  const uploadRes = await s3.upload(uploadParams).promise();
  console.log("upload to AWS", uploadRes);

  // const post = await s3.createPresignedPost({
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Fields: {
  //     key: req.query.file
  //   },
  //   Expires: 60, // seconds
  //   Conditions: [
  //     ["content-length-range", 0, 1048576] // up to 1 MB
  //   ]
  // });
  return uploadRes.Location;
};

export default apiHandler({
  post: [post, true]
});
