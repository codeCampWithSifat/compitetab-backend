import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import {
  checkoutFinalize,
  checkoutPay,
  createCheckOut,
} from "../controllers/CheckoutController.js";

const router = express.Router();

router.post("/", protect, createCheckOut);
router.put("/:id/pay", protect, checkoutPay);
router.post("/:id/finalize", protect, checkoutFinalize);

export default router;
