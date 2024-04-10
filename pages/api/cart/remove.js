import { getSession } from "next-auth/react";

import apiHandler from "@/helpers/api/globalApiHandler";
import {
  Cart,
  Content,
  CartItemMap,
  Item,
  ItemType,
  Subscription,
  SubscriptionLength,
  Series
} from "@/lib/database/connection";
import {
  getCartItems,
  getExistingItemsInCart,
  getCartItemId
} from "@/helpers/api/cart";

const createCart = async ({ user_uuid }) => {
  try {
    const newCart = await Cart.create({
      user_uuid
    });

    if (newCart === null) {
      return {
        success: false,
        message:
          "Shopping bag could not be created. We have been notified. Try again later."
      };
    }

    console.log("newCart", newCart.dataValues.id);
    return {
      success: true,
      message: "Cart successfully created",
      data: { cart_id: newCart.dataValues.id }
    };
  } catch (error) {
    console.log(error, "Cart not created");
    return {
      success: false,
      message: "Shopping bag could not be created. Try again later"
    };
  }
};

const addItemToCart = async (req, res) => {
  const {
    item_type_id,
    content_uuid,
    series_uuid,
    // event_uuid,
    // event_series_uuid,
    subscription_length
  } = req.body;

  const { user } = await getSession({ req });
  const cart = await Cart.findOne({
    where: {
      user_uuid: user.uuid
    }
  });
  let cart_id = cart?.id || undefined;
  //create cart if it does not exist
  if (cart === null) {
    const { data, success, message } = createCart({ user_uuid: user.uuid });

    if (!data) {
      return res.json(405).json({ success, message });
    }

    cart_id = data.cart_id;
  }

  console.log("cart_id=======", cart_id);
  //cart id exists, need to add item to cart
  let content_id, series_id;
  if (item_type_id === 1 && content_uuid) {
    //look up content id
    let content = await Content.findOne({
      where: { uuid: content_uuid }
    });

    if (content === null) {
      return res.status(404).json({
        success: false,
        message: "content uuid not found."
      });
    }
    content = content.get({ plain: true });
    content_id = content.id;
  } else if (item_type_id === 2 && series_uuid) {
    let series = await Series.findOne({
      where: { series_uuid: series_uuid }
    });
    if (series === null) {
      return res.status(404).json({
        success: false,
        message: "series uuid not found."
      });
    }
    series = series.get({ plain: true });
    console.log("series_id", series);
    series_id = series.id;
  }

  let subscriptionLength = await SubscriptionLength.findOne({
    where: {
      name: subscription_length || "annually" //annual subscription when not specified
    }
  });
  subscriptionLength = subscriptionLength.get({ plain: true });
  console.log("subscriptionLength", subscriptionLength);
  if (subscriptionLength === null) {
    return res.status(404).json({
      success: false,
      message: "subscription type not found."
    });
  }

  //look up subscription id associated with subscription length
  subscriptionLength = await Subscription.findOne({
    where: {
      subscription_length_id: subscriptionLength.id
    }
  });
  const subscription_id = subscriptionLength.id;
  console.log("subscription id", subscription_id);

  // find item in item table, if item doesn't exist, create item
  // need cart_id and item_id to map items to cart id, on cart_item_mapping
  // Item records subscriptionLength along with one of: content, series, event, event_series
  const itemAttributes = {
    item_type_id,
    subscription_id: subscription_id
  };
  if (item_type_id === 1) {
    itemAttributes.content_id = content_id ? content_id : null;
  } else if (item_type_id === 2) {
    itemAttributes.series_id = series_id ? series_id : null;
  }
  let item = await Item.findOne({ where: itemAttributes });
  //create item and map to subscription if does not exist
  if (item === null) {
    item = await Item.create(itemAttributes);
  }
  item = item.get({ plain: true });

  const item_id = item.id;

  //add item to cart on cart_item_mapping
  //check if item has been added, since we only have quantity 1
  let cart_item_map = await CartItemMap.findOne({
    where: { cart_id, item_id }
  });

  //if not added, add to cart,
  if (cart_item_map === null) {
    cart_item_map = await CartItemMap.create({
      cart_id,
      item_id
    });
  }

  if (cart_item_map === null) {
    return res.status(404).json({
      sucess: false,
      message: "Unable to add to cart"
    });
  }

  cart_item_map = await CartItemMap.findAll({
    where: {
      cart_id
    }
  }); //this is an array

  cart_item_map = cart_item_map.map((map) => map.get({ plain: true }));

  const allItemsInCart = [];
  for (let i = 0; i < cart_item_map.length; i++) {
    allItemsInCart.push(cart_item_map[i]);
  }

  let books = await getExistingItemsInCart({ user_uuid: user.uuid });
  if (!books.success) {
    return res.status(400).json(books);
  }
  return res.json({
    success: true,
    message: "Items successfully added",
    data: books.data
  });
};

const removeItemFromCart = async (req, res) => {
  const { series_uuid, content_uuid } = req.body;
  const { user } = await getSession({ req });

  const bodyData = series_uuid
    ? {
        series_uuid,
        // subscription_id: subscription_id || 1, //optional, 1
        user_uuid: user.uuid
      }
    : {
        content_uuid,
        // subscription_id: subscription_id || 1, //optional, 1
        user_uuid: user.uuid
      };
  let cart_item = await getCartItemId(bodyData);

  if (cart_item) {
    await cart_item.destroy(); // deletes the row

    return res.json({
      success: true,
      message: "Item successfully removed."
    });
  }
  return res.status(400).json({
    success: false,
    message: "Unable to remove item."
  });
};

export default apiHandler({
  post: [removeItemFromCart, true]
});
