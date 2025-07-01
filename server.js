import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/DB.js";
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";

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
app.use("/api/carts", cartRoutes);

app.listen(port, () => {
  console.log(`Running On Port ${port} Successfully`);
});
