import { getSession } from "next-auth/react";
import apiHandler from "@/helpers/api/globalApiHandler";
import {
  Cart,
  Content,
  CartItemMap,
  Item,
  Subscription,
  SubscriptionLength,
  sequelize,
  StripeAccounts
} from "@/lib/database/connection";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const pushContentToStripe = async (req, res) => {
  const { series_uuid, name, description, type } = req.body;
  //TO DO: get user session before performing action
  try {
    const stripeProductDetails = {
      name,
      description
    };

    const response = await stripe.products.create(stripeProductDetails);

    if (response === null) {
      return res.status(404).json({
        success: false,
        message: "Unable to create product on Stripe."
      });
    }

    return res.json({
      success: true,
      data: response.dataValues,
      message: "Successfully created product on Stripe"
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err.message
    });
  }
};

export default apiHandler({
  post: [pushContentToStripe, true]
});
