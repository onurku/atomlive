import Joi from "joi";
import { getSession } from "next-auth/react";

import {
  Cart,
  CartItemMap,
  Commission,
  Content,
  Event,
  EventSeries,
  Item,
  ItemType,
  Series,
  StripeAccounts,
  Subscription,
  SubscriptionLength
} from "@/lib/database/connection";
import joiValidationHelper from "@/helpers/api/validation";
import { getContentById, getAllContentBySeriesId } from "@/helpers/api/content";

const getAllItemTypes = async () => {
  let response = await ItemType.findAll();

  response = response.map((r) => r.get({ plain: true }));
  const items = {};
  for (let i = 0; i < response?.length; i++) {
    const item = response[i];
    items[item.id] = { ...item };
  }

  return {
    success: true,
    data: items || {} //{id: {...}}
  };
};

const getAllContent = async () => {
  //one single content from the Content table only

  const response = await Content.findAll();

  const content = {};
  for (let i = 0; i < response?.length; i++) {
    const c = response[i].dataValues;
    content[c.id] = { ...c };
    delete content.id;
  }

  return {
    success: true,
    data: content || {} //{id: {...}}
  };
};

const getAllContentSeries = async () => {
  //one single content from the Content table only

  const response = await Series.findAll();

  const content = {};
  for (let i = 0; i < response?.length; i++) {
    const c = response[i].dataValues;
    content[c.id] = { ...c };
    delete content.id;
  }

  return {
    success: true,
    data: content || {} //{id: {...}}
  };
};

const getAllEvent = async () => {
  //one single content from the Content table only

  const response = await Event.findAll();

  const content = {};
  for (let i = 0; i < response?.length; i++) {
    const c = response[i].dataValues;
    content[c.id] = { ...c };
    delete content.id;
  }

  return {
    success: true,
    data: content || {} //{id: {...}}
  };
};

const getAllEventSeries = async () => {
  //one single content from the Content table only

  const response = await EventSeries.findAll();

  const content = {};
  for (let i = 0; i < response?.length; i++) {
    const c = response[i].dataValues;
    content[c.id] = { ...c };
    delete content.id;
  }

  return {
    success: true,
    data: content || {} //{id: {...}}
  };
};

const getAllCommissions = async () => {
  try {
    let response_commissions = await Commission.findAll();
    if (response_commissions === null) {
      return {};
    }
    response_commissions = response_commissions.map((map) =>
      map.get({ plain: true })
    );
    const commissions = {}; //look up table {id : {...}}
    for (let i = 0; i < response_commissions.length; i++) {
      commissions[response_commissions[i].id] = {
        ...response_commissions[i]
      };
    }

    return {
      success: true,
      data: commissions
    }; //look up table {id : {...}}
  } catch (error) {
    return {
      success: false,
      message: "Unknown error in commission table."
    };
  }
};

const getAllSubscriptionLengths = async () => {
  try {
    const response_subscriptionLengths = await SubscriptionLength.findAll();
    if (response_subscriptionLengths === null) {
      return {};
    }
    const subscriptionLengths = {};
    for (let i = 0; i < response_subscriptionLengths.length; i++) {
      subscriptionLengths[response_subscriptionLengths[i].dataValues.id] = {
        ...response_subscriptionLengths[i].dataValues
      };
    }

    return {
      success: true,
      data: subscriptionLengths
    }; //look up table {id : name}}
  } catch (error) {
    return {
      success: false,
      message: "Unknown error in subscription_length table."
    };
  }
};

const getAllSubscriptionTypes = async () => {
  try {
    //need to look up commission_id in commission table and subscription_length_id in subscription_length table
    let response_subscriptions = await Subscription.findAll();
    if (response_subscriptions === null) {
      return {};
    }
    response_subscriptions = response_subscriptions.map((map) =>
      map.get({ plain: true })
    );
    console.log("response_subscriptions", response_subscriptions);
    const response_commissions = await getAllCommissions();
    if (!response_commissions.success) {
      return response_commissions;
    }
    console.log("response_commissions", response_commissions);
    const commissions = response_commissions.data;
    const response_subscriptionLengths = await getAllSubscriptionLengths(); //look up table { id : name}
    if (!response_subscriptionLengths.success) {
      return response_subscriptionLengths;
    }
    console.log("response_subscriptionLengths", response_subscriptionLengths);
    const subscriptionLengths = response_subscriptionLengths.data;

    const subscriptionTypes = {}; //inject info into subscriptionTypes
    for (let i = 0; i < response_subscriptions.length; i++) {
      const s = response_subscriptions[i];
      s.commission = commissions[`${s.commission_id}`];
      delete s.commission.id;
      s.subscription_length =
        subscriptionLengths[`${s.subscription_length_id}`].name;
      delete s.subscription_length.id;
      delete s.commission_id;
      delete s.subscription_length_id;
      subscriptionTypes[`${s.id}`] = s;
    }

    return {
      success: true,
      data: subscriptionTypes
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error?.message
    };
  }
};

const cartValidationSchema = Joi.object({
  cart_id: Joi.number().integer().required(),
  user_uuid: Joi.string().required()
});

const validateCartBelongsToUser = async ({ cart_id, user_uuid }) => {
  const validationErr = joiValidationHelper(cartValidationSchema, {
    cart_id,
    user_uuid
  });

  if (validationErr !== undefined) {
    console.log("Input Validation Err:", validationErr);
    return {
      success: false,
      message: validationErr
    };
  }

  try {
    let response = await Cart.findOne({
      where: {
        id: cart_id,
        user_uuid
      }
    });
    return response ? true : false;
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};

const getCartItems = async ({ cart_id, user_uuid }) => {
  try {
    let response = await validateCartBelongsToUser({ cart_id, user_uuid });
    console.log("xxxx get cart===", response);

    if (!response) {
      return {
        success: false,
        message: "Unable to validate cart belongs to user."
      };
    }

    // get Items from cart id
    let itemsInCart = await CartItemMap.findAll({
      where: {
        cart_id
      }
    });

    if (itemsInCart === null) {
      return [];
    }
    itemsInCart = itemsInCart.map((map) => map.get({ plain: true }));

    const allSubscriptionTypes = await getAllSubscriptionTypes();
    console.log("allSubscriptionTypes", allSubscriptionTypes);
    if (!allSubscriptionTypes.success) {
      return allSubscriptionTypes;
    }

    const allItemTypes = await getAllItemTypes();
    console.log("allItemsTypes", allItemTypes);
    let allContent, allSeries, allEvent, allEventSeries;

    const items = [];
    for (let i = 0; i < itemsInCart.length; i++) {
      let oneItem = itemsInCart[i];
      const item_id = itemsInCart[i].item_id;

      const findItem = await Item.findOne({
        where: { id: item_id }
      });

      let item = findItem.get({ plain: true });

      item.subscription = allSubscriptionTypes.data[`${item.subscription_id}`];
      delete item.subscription_id;
      console.log(
        "item ",
        item,
        itemsInCart,
        allSubscriptionTypes.data[`${item.subscription_id}`]
      );
      oneItem = { ...oneItem, ...item };
      oneItem.item_type = allItemTypes.data[`${oneItem.item_type_id}`].name;

      switch (oneItem.item_type) {
        case "content":
          if (!allContent) {
            allContent = await getAllContent();
          }
          oneItem.content = allContent.data[`${oneItem.content_id}`];
          break;
        case "series":
          if (!allSeries) {
            allSeries = await getAllContentSeries();
          }
          oneItem.series = allSeries.data[`${oneItem.series_id}`];
          break;
        case "event":
          if (!allEvent) {
            allEvent = await getAllEvent();
          }
          oneItem.event = allEvent.data[`${oneItem.event_id}`];
          break;
        case "event_series":
          if (!allEventSeries) {
            allEventSeries = await getAllEventSeries();
          }
          oneItem.event_series =
            allEventSeries.data[`${oneItem.event_series_id}`];
          break;
      }

      if (oneItem?.subscription?.id) {
        delete oneItem.subscription.id;
      }
      if (oneItem.content_id) {
        delete oneItem.content_id;
      }
      if (oneItem?.content?.id) {
        delete oneItem.content.id;
      }
      if (oneItem.series_id) {
        delete oneItem.series_id;
      }
      if (oneItem.event_id) {
        delete oneItem.event_id;
      }
      if (oneItem.event_series_id) {
        delete oneItem.event_series_id;
      }
      if (oneItem.agora_event_id) {
        delete oneItem.agora_event_id;
      }
      if (oneItem.item_type_id) {
        delete oneItem.item_type_id;
      }
      if (oneItem?.item_id) {
        delete oneItem.item_id;
      }
      if (oneItem?.id) {
        delete oneItem.id;
      }
      if (oneItem?.cart_id) {
        delete oneItem.cart_id; //id of Cart
      }
      if (oneItem?.id) {
        delete oneItem.id; //id of CartItemMap
      }
      items.push(oneItem);
      //console.log("find itemsxxxxx", oneItem.item.subscription);
    }

    console.log("all items", items);
    return {
      success: true,
      data: items
    };
  } catch (error) {
    console.log("error: ", error);
  }
};

const getExistingItemsInCart = async ({ user_uuid }) => {
  const errorObj = {
    success: false,
    message: "Unable to get items in cart"
  };

  try {
    let newCart = await Cart.findOne({
      where: {
        user_uuid
      }
    });

    if (newCart === null) {
      //create new cart for user if did not exist
      newCart = await Cart.create({
        user_uuid
      });

      return {
        success: true,
        message: "Successfully retrieved cart",
        data: {}
      };
    }
    newCart = newCart.get({ plain: true });

    let message;
    let allItems = await CartItemMap.findAll({
      where: {
        cart_id: newCart.id
      },
      attributes: { exclude: ["id"] }
    });

    if (allItems === null) {
      message = "Cart items successfully retrieved";
    }

    allItems = allItems.map((map) => map.get({ plain: true }));
    let returnObj = {}; //return an empy object if not found

    let stripePublisherId;

    for (let i = 0; i < allItems.length; i++) {
      const thisItem = allItems[i];
      const itemId = thisItem.item_id;
      let item = await Item.findOne({
        where: { id: itemId }
      });
      item = item.get({ plain: true });
      const itemTypeId = item.item_type_id;
      let itemDetails, itemType;
      switch (itemTypeId) {
        case 1: //content
          itemType = "content";
          const itemDetails_response = await getContentById({
            content_id: item.content_id
          });
          itemDetails = itemDetails_response?.success
            ? itemDetails_response?.data
            : {};
          console.log("itemDetails", itemDetails);
          break;
        case 2:
          itemType = "series";
          itemDetails = await Series.findOne({
            where: {
              id: item.series_id
            },
            attributes: { exclude: ["id"] }
          });
          itemDetails = itemDetails.get({ plain: true });
          stripePublisherId = itemDetails.user_uuid_as_publisher;
          const booksInSeries = await getAllContentBySeriesId(item.series_id);
          console.log("booksInSeries", booksInSeries.length, itemDetails);
          itemDetails.list_of_content = booksInSeries;
          break;
        case 3:
          itemType = "event";
          itemDetails = await Event.findOne({
            where: {
              id: item.event_id,
              is_active: true
            },
            attributes: { exclude: ["id", "is_active"] }
          });
          itemDetails = itemDetails.get({ plain: true });
          break;
        case 4:
          itemType = "event_series";
          itemDetails = await Event.findOne({
            where: {
              id: item.event_series_id
            },
            attributes: { exclude: ["id"] }
          });
          itemDetails = itemDetails.get({ plain: true });
      }

      let subscription = await Subscription.findOne({
        where: {
          id: item.subscription_id
        }
      });

      if (subscription) {
        subscription = subscription.get({ plain: true });
        let stripe_account = await StripeAccounts.findOne({
          where: {
            user_uuid: stripePublisherId
          }
        });

        stripe_account = stripe_account
          ? stripe_account.get({ plain: true })
          : null;
        thisItem.subscription_option = {
          price: subscription.price,
          length: "annually",
          stripe: {
            price_id: item.stripe_price_id,
            product_id: item.stripe_product_id,
            destination: stripe_account.stripe_account_id
          }
        };
      } else {
        thisItem.subscription_option = null;
      }

      thisItem.type = itemType;
      thisItem.details = {
        ...itemDetails
      };
      thisItem.cover_url = item.cover_url;

      delete thisItem.cart_id;
      if (!returnObj[itemType]) {
        returnObj[itemType] = [];
      }

      returnObj[itemType].push(thisItem);
    }

    return {
      success: true,
      message: "Successfully retrieved cart",
      data: returnObj
    };
  } catch (error) {
    console.log("error in getExistingItemsInCart");
    return errorObj;
  }
};

const getCartItemIdFromItemId = async ({ item_id, user_uuid }) => {
  if (!item_id || !user_uuid) {
    return null;
  }
  console.log("user_uuid", user_uuid);
  let cart = await Cart.findOne({
    where: {
      user_uuid
    }
  });

  if (!cart) {
    return null;
  }

  cart = cart.get({ plain: true });
  const cart_id = cart.id;
  console.log("cart_idxx", cart_id);

  let cart_item = await CartItemMap.findOne({
    where: { cart_id, item_id }
  });

  if (!cart_item) {
    return null;
  }

  return cart_item;
};

const getCartItemId = async ({
  series_uuid,
  content_uuid,
  event_uuid,
  event_series_uuid,

  user_uuid
}) => {
  console.log("series_uuid", series_uuid, user_uuid);

  let item;
  if (content_uuid) {
  } else if (series_uuid) {
    let series = await Series.findOne({
      where: {
        series_uuid,
        is_active: true
      },
      attributes: { exclude: ["is_active"] }
    });
    series = series.get({ plain: true });

    if (!series) {
      return null;
    }
    console.log("series object", series);

    const series_id = series.id;
    item = await Item.findOne({
      where: {
        item_type_id: 2,
        series_id
      }
    });
    item = item.get({ plain: true });
  } else if (event_uuid) {
  } else if (event_series_uuid) {
  }

  if (!item) {
    return null;
  }

  const cart_item = await getCartItemIdFromItemId({
    item_id: item.id,
    user_uuid
  });

  return cart_item;
};

export {
  getCartItemId,
  getAllSubscriptionTypes,
  getCartItems,
  getExistingItemsInCart
};
