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
import { getCartItems, getExistingItemsInCart } from "@/helpers/api/cart";

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
    item_id,
    item_type_id,
    content_uuid,
    series_uuid
    // event_uuid,
    // event_series_uuid,
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

  // Item should already exist in the item table. We should never add item to table
  // need cart_id and item_id to map items to cart id, on cart_item_mapping
  // Item records subscriptionLength along with one of: content, series, event, event_series

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

const getUserCart = async (req, res) => {
  const session = await getSession({ req });
  const { user } = session;

  const emptyCartState = {
    success: true,
    message: "No cart found",
    data: {}
  };

  if (user === null) {
    return res.json(emptyCartState);
  }

  const response = await getExistingItemsInCart({ user_uuid: user.uuid });

  if (!response.success) {
    return res.json(emptyCartState);
  }

  return res.send(response);
};

export default apiHandler({
  get: [getUserCart, true], //true: sign-in required
  post: [addItemToCart, true]
});
