import Subscriber from "../models/Subscriber.js";

const newslaterSubsciption = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    let subscrieber = await Subscriber.findOne({ email });
    if (subscrieber) {
      return res.status(400).json({ message: "Email is already Subscribe" });
    }
    subscrieber = new Subscriber({ email });
    await subscrieber.save();
    res
      .status(201)
      .json({ message: "Successfully Subscribe To The Newslater" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export { newslaterSubsciption };
