import { getSession } from "next-auth/react";
import apiHandler from "@/helpers/api/globalApiHandler";
import { StripeAccounts } from "@/lib/database/connection";
import moment from "moment";

const BASE_URL = process.env.VERCEL_URL;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const retrieveUserStripeDetails = async ({ user_uuid }) => {
  try {
    const response = await StripeAccounts.findOne({
      where: {
        user_uuid
      },
      attributes: { exclude: ["id"] }
    });

    const account = await stripe.accounts.create({ type: "express" });
    let accountLink = await stripe.accountLinks.create({
      account:
        response === null ? account.id : response.dataValues.stripe_account_id,
      refresh_url: `${BASE_URL}publishers/admin/refresh`,
      return_url: `${BASE_URL}publishers/admin/success`,
      type: "account_onboarding"
    });

    if (response === null) {
      return {
        success: true,
        data: {
          account_link: accountLink.url
        }
      };
    }

    const { modified_at } = response;
    const daysAgo90 = moment().subtract(90, "day"); //90 days ago
    const responseData = response.get({ plain: true });

    return {
      success: true,
      data: {
        ...responseData,
        account_link: accountLink.url,
        shouldRefreshStripeAccount:
          moment(modified_at).isSameOrBefore(daysAgo90) //refreshStripeDetails if over 30 days
      }
    };
  } catch (err) {
    return {
      success: false,
      message: err.message
    };
  }
};

const retrieveStripeAuthDetails = async (code) => {
  try {
    const result = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code
    });

    const account = await stripe.accounts?.retrieve(result?.stripe_user_id);
    // Here we get the important details of the account.
    const account_analysis = {
      has_connected_account: !!account?.id, // Check if account ID received is actually connected or exists.
      account_id: account?.id,
      has_completed_process: account?.details_submitted,
      is_valid: account?.charges_enabled && account?.payouts_enabled,
      display_name:
        account?.settings?.dashboard?.display_name ||
        account?.display_name ||
        null,
      country: account?.country,
      currency: account?.default_currency
    };
    // boolean - Once the account is connected, should we let it unlink?
    const should_allow_unlink =
      account_analysis?.has_connected_account &&
      (!account_analysis?.is_valid ||
        !account_analysis?.has_completed_process ||
        !account_analysis?.display_name);

    const returnObj = {
      success: true,
      data: {
        oauth: result,
        account,
        account_analysis,
        should_allow_unlink
      },
      message: "successfully retrieved Stripe user data"
    };

    return returnObj;
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: err.message
    };
  }
};

const authorizeUser = async (req, res) => {
  const { code } = req.body;
  const session = await getSession({ req });
  console.log("verify_stripe", session);

  try {
    let response = await retrieveUserStripeDetails({
      user_uuid: session.user.uuid
    });

    const { data } = response;
    const stripeUserData = data; //save for later use

    if (data?.shouldRefreshStripeAccount === false) {
      return res.json({
        success: true,
        data,
        message: "Successfully connected account"
      });
    }

    //refresh account info from stripe
    response = await retrieveStripeAuthDetails(code);
    console.log("result", response);

    if (!response.success) {
      return response;
    }

    //if successful, do nothing
    const { account, oauth, account_analysis, should_allow_unlink } =
      response.data;

    if (data === null) {
      response = await StripeAccounts.create({
        user_uuid: session.user.uuid,
        stripe_account_id: account?.id,
        display_name: account_analysis?.display_name,
        has_completed_process: account_analysis?.has_completed_process,
        has_connected_account: account_analysis?.has_connected_account,
        has_overdue_requirements:
          account?.requirements?.currently_due?.length > 0,
        charges_enabled: account?.charges_enabled,
        payouts_enabled: account?.payouts_enabled,
        country: account?.country,
        currency: account?.default_currency,
        metadata: JSON.stringify({
          access_token: oauth?.access_token,
          refresh_token: oauth?.refresh_token,
          token_type: "bearer"
        })
      });

      if (response === null) {
        return res.json({
          success: false,
          message: "Unable to create entry in table."
        });
      }

      return res.json({
        success: true,
        data: response.dataValues,
        message: "Successfully connected account"
      });
    }

    //retrieve info from db
    if (stripeUserData?.shouldRefreshStripeAccount) {
      delete stripeUserData.shouldRefreshStripeAccount;
    }

    const returnObj = {
      success: true,
      data: stripeUserData,
      message: "Successfully connected account"
    };

    return res.json(returnObj);
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: `${err.message} - Something went wrong during the process. We have been notified so try again later.`
    });
  }
};

const getStripeDetails = async (req, res) => {
  const session = await getSession({ req });

  try {
    let response = await retrieveUserStripeDetails({
      user_uuid: session.user.uuid
    });

    return res.json(response);
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: `${err.message} - Something went wrong during the process. We have been notified so try again later.`
    });
  }
};

export default apiHandler({
  get: [getStripeDetails, true], //true: sign in required
  post: [authorizeUser, true]
});
