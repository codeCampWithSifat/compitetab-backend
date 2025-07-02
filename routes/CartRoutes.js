import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import {
  createCart,
  deleteCartItem,
  getAllCartItems,
  mergeItem,
  updateCartItem,
} from "../controllers/CartController.js";

const router = express.Router();

router.post("/", createCart);
router.put("/", updateCartItem);
router.get("/", getAllCartItems);
router.post("/merge", protect, mergeItem);
router.delete("/", deleteCartItem);

export default router;
