import { getSession } from "next-auth/react";
import apiHandler from "@/helpers/api/globalApiHandler";
import { StripeAccounts } from "@/lib/database/connection";
import moment from "moment";

const BASE_URL = process.env.VERCEL_URL;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getAllSubscriptions = async (req, res) => {
  const session = await getSession({ req });
  const { email, uuid } = session.user;

  try {
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err,
      message: `${err.message} - Something went wrong during payment processing.`
    });
  }
};

const createSubscription = async (req, res) => {
  const session = await getSession({ req });
  const { email, uuid } = session.user;
  try {
    return res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      error: err,
      message: `${err.message} - Something went wrong during the process. We have been notified so try again later.`
    });
  }
};

export default apiHandler({
  get: [getAllSubscriptions, true],
  post: [createSubscription, true] //true: sign in required
});
