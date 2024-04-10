import { getSession } from "next-auth/react";
import apiHandler from "@/helpers/api/globalApiHandler";
import {
  Cart,
  Content,
  CartItemMap,
  Item,
  Subscription,
  SubscriptionLength,
  sequelize
} from "@/lib/database/connection";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const uploadStripeDetails = async (req, res) => {
  console.log("refresh stripe details", req);
  // const { account, account_analysis, user_id } = req.body;
  // console.log("stripe:", account, account_analysis, user_id);
  // try {
  // } catch (err) {
  //   res.status(500).send({
  //     success: false,
  //     error: err.message
  //   });
  // }
};

export default apiHandler({
  post: [uploadStripeDetails, true]
});
