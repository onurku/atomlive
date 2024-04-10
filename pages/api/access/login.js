import { getSession } from "next-auth/react";

import apiHandler from "helpers/api/globalApiHandler";
import { User } from "@/lib/database/connection";
import { sequelize } from "@/lib/database/models";

const lastloginTime = async (req, res) => {
  const session = await getSession({ req });

  const t = await sequelize.transaction();

  try {
    const user = await User.findOne({
      where: {
        uuid: session.user.uuid
      },
      raw: true
    });

    if (user) {
      t.commit();
      return res.json({
        last_login_time: user.last_login_time
      });
    }
    return res.status(401).json({
      success: false,
      message: "User not found"
    });
  } catch (e) {
    await t.rollback();
    return res.status(500).end();
  }
};

export default apiHandler({
  get: [lastloginTime, true]
});
