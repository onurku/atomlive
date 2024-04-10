import { Op } from "sequelize";
import {
  User,
  Child,
  Role,
  LanguageAndRegion,
  sequelize
} from "@/lib/database/connection";

const getCompleteUserProfile = async (email) => {
  const allowedFields = [
    "id",
    "uuid",
    "email",
    "is_email_verified",
    "first_name",
    "last_name",
    "title",
    "phone",
    "phone_verified",
    "about",
    "country",
    "timezone",
    "photo_url",
    "organization_id",
    "metadata_timezone",
    "is_active",
    "publisher_name"
  ];

  const startTime = new Date();

  const t = await sequelize.transaction();

  try {
    console.log("-1", new Date() - startTime);
    const user = await User.findOne({
      where: {
        email: email
      },
      include: [
        {
          model: LanguageAndRegion,
          attributes: ["language_code"],
          through: { attributes: [] }
        },
        {
          model: Role,
          attributes: ["role"],
          through: { attributes: [] }
        }
      ],
      attributes: allowedFields
      // raw: true
    });

    console.log("0", new Date() - startTime);
    const children = await Child.findAll({
      where: {
        [Op.or]: [{ parent_0_id: user.id }, { parent_1_id: user.id }]
      },
      attributes: { exclude: ["id"] }
      // raw: true
    });
    console.log("1", new Date() - startTime);
    const returnObj = user.toJSON();
    console.log("1b", new Date() - startTime);
    delete returnObj.id;

    returnObj.children = children;

    const roles = [];

    if (returnObj.Roles) {
      for (let i of returnObj.Roles) {
        roles.push(i.role);
      }
      returnObj.roles = roles;
      delete returnObj.Roles;
    }
    const languages = [];
    if (returnObj.LanguagesAndRegions) {
      for (let lang of returnObj.LanguagesAndRegions) {
        languages.push(lang.language_code);
      }
      returnObj.languages = languages;
      delete returnObj.LanguagesAndRegions;
    }

    if (returnObj.Roles) {
      delete returnObj.Roles;
      delete returnObj.LanguagesAndRegions;
    }

    await t.commit();
    return returnObj;
  } catch (e) {
    await t.rollback();
    return e;
  }
};

const getUserRoles = async (uuid) => {
  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: {
        uuid: uuid
      },
      include: [
        {
          model: Role,
          attributes: ["role"],
          through: { attributes: [] }
        }
      ],
      attributes: []
      // raw: true
    });

    const returnObj = user.toJSON();
    const roles = [];
    console.log("roles====", returnObj);

    if (returnObj.Roles) {
      for (let i = 0; i < returnObj.Roles.length; i++) {
        roles.push(returnObj.Roles[i].role);
      }
      returnObj.roles = roles;
      delete returnObj.Roles;
    }
    await t.commit();
    return returnObj;
  } catch (e) {
    await t.rollback();
    return e;
  }
};

export { getUserRoles, getCompleteUserProfile };
