import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { myOrders, singleOrder } from "../controllers/OrderController.js";

const router = express.Router();

// route get my-orders
//  Logged-in users oders
// access Private
router.get("/my-orders", protect, myOrders);
router.get("/:id", protect, singleOrder);

export default router;
