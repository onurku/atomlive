import { getSession } from "next-auth/react";
import apiHandler from "@/helpers/api/globalApiHandler";
import { getCompleteUserProfile } from "helpers/api/users";
import {
  Series,
  Content,
  Role,
  SeriesContentMap,
  LanguageAndRegion,
  sequelize
} from "@/lib/database/connection";

const initDb = async (req, res) => {
  const t = await sequelize.transaction();

  // const r = await Role.bulkCreate(roles, { transaction: t });
  const lang = await LanguageAndRegion.bulkCreate(languages);
  console.log(lang);
  await t.commit();
  if (lang === null) {
    return res.status(404).json({ success: false, message: "Error" });
  }
  return res.json({ success: true, message: "Successful " });
};

export default apiHandler({
  post: [initDb, false] //true: sign-in required
});
