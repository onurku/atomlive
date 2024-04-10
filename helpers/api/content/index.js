import Joi from "joi";
import joiValidationHelper from "@/helpers/api/validation";
const { Op } = require("sequelize");
import {
  Commission,
  Content,
  Item,
  Series,
  SeriesContentMap,
  Subscription,
  SubscriptionLength
} from "@/lib/database/connection";
import apiHandler from "helpers/api/globalApiHandler";

const schema = Joi.object({
  publisher_uuid: Joi.string(),
  publisher_name: Joi.string()
}).min(1);

const getContentById = async ({ content_id, content_uuid }) => {
  try {
    let contentId = content_id;
    if (!content_id) {
      const content_id_response = await Content.findOne({
        where: {
          content_uuid
        },
        attributes: { exclude: ["id", "is_active"] }
      });

      if (content_id_response === null) {
        return {
          success: false,
          message: "Content does not exist"
        };
      }

      return {
        success: true,
        data: content_id_response.dataValues,
        message: "Successfully found content"
      };
    }
    const response = await Content.findOne({
      where: {
        id: contentId,
        is_active: true
      },
      attributes: { exclude: ["id", "is_active"] }
    });

    // console.log("getcontent", response.dataValues);
    return {
      success: true,
      data: response === null ? [] : response.dataValues
    };
  } catch (e) {
    return {
      success: false,
      message:
        "Unknown error while accessing database. Try again, as we've been notified."
    };
  }
};

const getAllContentBySeriesId = async (series_id) => {
  console.log("series_idxxx", series_id);
  const contentRes = await SeriesContentMap.findAll({
    where: {
      series_id: series_id
    },
    attributes: { exclude: ["id"] }
  });

  const contentInSeries = contentRes.map((map) => map.get({ plain: true }));
  const listPromises = contentInSeries.map(async (oneContent) => {
    const content_id = oneContent.content_id;
    let content = await Content.findOne({
      where: {
        id: content_id,
        is_active: true
      },
      attributes: { exclude: ["id"] }
    });
    content = content.get({ plain: true });
    return content;
  });
  const list = await Promise.all(listPromises);
  return list;
};

const getSeriesById = async ({ series_id, series_uuid }) => {
  try {
    let seriesId = series_id;
    if (!series_id) {
      //if series_id not given, find series_id from series_uuid
      const series_id_response = await Series.findOne({
        where: { series_uuid }
      });

      if (series_id_response === null) {
        return {
          success: false,
          message: "Series does not exist."
        };
      }
      seriesId = series_id_response.dataValues.id;
    }

    //find all Content from this series
    let response = await SeriesContentMap.findAll({
      where: {
        id: seriesId
      }
    });

    if (response === null) {
      return {
        success: true,
        data: null
      };
    }

    response = response.get({ plain: true });

    return response;
  } catch (e) {
    console.log("error", e);

    return {
      success: false,
      message:
        "Unknown error while accessing database. We have been notified. Try again later."
    };
  }
};

const getSubscriptionOptionsBySeriesId = async ({ series_id }) => {
  //In order to get a list of possible defined subscriptions, we look up the item table and use the subscription_id

  let items = await Item.findAll({
    where: { series_id }
  });
  if (!items) {
    return null;
  }
  items = items.map((item) => item.get({ plain: null })); //this is an array

  const subscriptionListPromises = items.map(async (oneItem) => {
    const subscription_id = oneItem.subscription_id;
    const stripe_price_id = oneItem.stripe_price_id;
    const stripe_product_id = oneItem.stripe_product_id;
    console.log("item_id", oneItem.id);
    let subscription = await Subscription.findOne({
      where: {
        id: subscription_id
      }
    });

    if (subscription) {
      subscription = subscription.get({ plain: true });

      let subscriptionLength = await SubscriptionLength.findOne({
        where: {
          id: subscription.subscription_length_id
        }
      });

      if (!subscriptionLength) {
        console.log("no subscription length found");
      }
      subscriptionLength = subscriptionLength.get({ plain: true });
      subscription.type = subscriptionLength.name; //retrieve how long is subscription
      console.log("subscription_length", subscriptionLength);
      let commission = await Commission.findOne({
        where: {
          id: subscription.commission_id
        },
        attributes: {
          exclude: ["id"]
        }
      });
      if (!commission) {
        console.log("no commission value found");
      }
      commission = commission.get({ plain: true });
      subscription.commission = commission;

      let subscriptionOption = {
        type: subscription.type,
        price: subscription.price,
        commission: subscription.commission,
        stripe_price_id,
        stripe_product_id,
        item_id: oneItem.id,
        cover_url: oneItem.cover_url
      };
      return subscriptionOption;
    }
  });
  const subscriptionOptions = await Promise.all(subscriptionListPromises);
  return subscriptionOptions;
};

export {
  getContentById,
  getAllContentBySeriesId,
  getSeriesById,
  getSubscriptionOptionsBySeriesId
};
