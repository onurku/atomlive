import apiHandler from "helpers/api/globalApiHandler";
import { User } from "@/lib/database/connection";
import { getSession } from "next-auth/react";

const isEmailVerified = async (req, res) => {
  const session = await getSession({ req });
  let userObj = await User.findOne({
    where: {
      uuid: session.user.uuid
    }
  });
  if (!userObj) {
    return res.status(500).json("User Not Found");
  }

  userObj = userObj.get({ plain: true });
  return res.send({
    email: userObj.email,
    isEmailVerified: userObj.is_email_verified
  });
};

export default apiHandler({
  get: [isEmailVerified, true]
});
