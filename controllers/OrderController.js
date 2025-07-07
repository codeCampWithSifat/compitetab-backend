import Order from "../models/Order.js";

const myOrders = async (req, res) => {
  try {
    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get Order Details By Id
const singleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export { myOrders, singleOrder };
