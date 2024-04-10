import { getSession } from "next-auth/react";
import apiHandler from "@/helpers/api/globalApiHandler";
import { StripeAccounts } from "@/lib/database/connection";
import moment from "moment";

const BASE_URL = process.env.VERCEL_URL;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getCustomerDetails = async (req, res) => {
  const session = await getSession({ req });
  const { email, uuid } = session.user;
  try {
    const customer = await stripe.customers.create({
      email: email,
      payment_method: "pm_card_visa",
      invoice_settings: { default_payment_method: "pm_card_visa" }
    });

    console.log("session customer", customer);
    if (customer) {
      //save to db
      const customer_account = await StripeAccounts.findOne({
        where: { user_uuid: uuid }
      });
      const response = await customer_account.update({
        stripe_customer_id: customer.id
      });

      console.log("session customer update", response);
      return res.json({
        success: true,
        data: {
          customer
        }
      });
    }
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
  post: [getCustomerDetails, true] //true: sign in required
});
