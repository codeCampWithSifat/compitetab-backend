import Order from "../models/Order.js";

const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name");
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered =
        req.body.status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Order Removed Successfully" });
    } else {
      return res.status(404).json({ message: "Orders Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export { getAllOrdersForAdmin, updateOrderStatus, deleteOrder };
