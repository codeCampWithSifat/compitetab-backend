import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import {
  deleteOrder,
  getAllOrdersForAdmin,
  updateOrderStatus,
} from "../controllers/AdminOrderController.js";

const router = express.Router();

router.get("/", protect, admin, getAllOrdersForAdmin);
router.put("/:id", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

export default router;
