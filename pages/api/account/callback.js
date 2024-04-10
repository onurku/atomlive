import { getSession } from "next-auth/react";

import apiHandler from "helpers/api/globalApiHandler";
import { getCompleteUserProfile } from "helpers/api/users";
import { getExistingItemsInCart } from "@/helpers/api/cart";

const getProfile = async (req, res) => {
  const { user } = await getSession({ req });

  const profileData = await getCompleteUserProfile(user.email);
  return res.json(profileData);
};

export default apiHandler({
  get: [getProfile, true]
});
