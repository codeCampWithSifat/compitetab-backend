import mongoose from "mongoose";
import "dotenv/config";
import Product from "./models/ProductModel.js";
import User from "./models/User.js";
import products from "../rabbit-assets/data/products.js";
import Cart from "./models/CartModel.js";

mongoose.connect(process.env.MONGO_URL);

const seedData = async () => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin
    const createuser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    });

    // Assign The Default user Id to each Product
    const userID = createuser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // insert the product into the database
    await Product.insertMany(sampleProducts);

    console.log("Product Data Seeded Succesfully");
    process.exit();
  } catch (error) {
    console.error("Error Seeding The Data", error);
    process.exit(1);
  }
};

seedData();
