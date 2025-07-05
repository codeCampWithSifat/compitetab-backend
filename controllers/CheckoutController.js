import Checkout from "../models/Checkout.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/Order.js";

// Create a new chekout session
// access private
const createCheckOut = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No Items For Checkout" });
  }
  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log("New Checkout", req.user._id);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating Checkout Session", error);
    res.status(500).send("Server Error");
  }
};

// put route /api/checkout/:id/pay
// update chekout to mark as paid after succesful payment
//  access private

const checkoutPay = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return req.status(404).json({ message: "Checkout Not Found" });
    }

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    console.error("Checkout Pay By Id Error", error);
    res.status(500).send("Server Error");
  }
};

// route post /api/checkout/:id/finalize
// desc finalize checkout and convert to an order after confirmation
// access private

const checkoutFinalize = async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout Not Found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      // Create Final Order Based On The Checkout Details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      (checkout.isFinalized = true), (checkout.finalizedAt = Date.now());
      await checkout.save();
      // delete the cart associate with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: "Checkout Already Finalized" });
    } else {
      res.status(400).json({ message: "Checkout Is Not Paid" });
    }
  } catch (error) {
    console.error("Finalized Checkout Error", error);
    res.status(404).send("Server Error");
  }
};
export { createCheckOut, checkoutPay, checkoutFinalize };
