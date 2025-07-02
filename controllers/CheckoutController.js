import Checkout from "../models/Checkout.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/Order.js";

const createCheckOut = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export { createCheckOut };
