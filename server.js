import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/DB.js";
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import checkoutRoutes from "./routes/CheckoutRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import uploadRoutes from "./routes/UploadRoutes.js";
import subscibeRoutes from "./routes/SubscriberRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import productAdminRoutes from "./routes/ProductAdminRoutes.js";
import adminOrderRoutes from "./routes/AdminOrderRoutes.js";

const app = express();
const port = process.env.PORT;

// use all the middleware
app.use(express.json());
app.use(cors());

// connect to the database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello Sayed Sifat How Are you ?");
});

// use all the routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscibeRoutes);
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(port, () => {
  console.log(`Running On Port ${port} Successfully`);
});
