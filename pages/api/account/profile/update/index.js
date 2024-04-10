import apiHandler from "helpers/api/globalApiHandler";
import { getSession } from "next-auth/react";
import { getCompleteUserProfile } from "helpers/api/users";
import joiValidationHelper from "helpers/api/validation";

import {
  User,
  UserLanguageMap,
  LanguageAndRegion
} from "@/lib/database/connection";

const updateProfile = async (req, res) => {
  const { languages } = req.body;

  console.log("update profile", req.body);

  const allowedFields = [
    "title",
    "first_name",
    "last_name",
    "about",
    "country",
    "timezone",
    "organization_id"
  ];

  const newData = {};
  for (const k in req.body) {
    if (allowedFields.includes(k) && k in req.body) {
      newData[k] = req.body[k];
    }
  }

  const session = await getSession({ req });
  const user = await User.findOne({
    where: {
      uuid: session.user.uuid
    }
  });

  await user.update({
    ...newData
  });

  if (languages) {
    // Delete old mappings
    const numOfDeletes = await UserLanguageMap.destroy({
      where: {
        user_id: user.dataValues.id
      }
    });

    const newObjs = [];
    const newLanguages = languages;

    for (let i = 0; i < newLanguages.length; i++) {
      const language = await LanguageAndRegion.findOne({
        where: {
          language_code: newLanguages[i]
        },
        raw: true
      });
      if (language === null) {
        res
          .status(404)
          .json({ success: false, message: `${newLanguages[i]} not found` });
      }

      newObjs.push({
        user_id: user.dataValues.id,
        language_id: language.id
      });
    }
    await UserLanguageMap.bulkCreate(newObjs);
  }
  const updatedUser = await getCompleteUserProfile(session.user.uuid);
  return res.json({ success: true, data: updatedUser });
};

export default apiHandler({
  post: [updateProfile, true]
});
