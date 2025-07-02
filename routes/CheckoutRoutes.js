import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import { createCheckOut } from "../controllers/CheckoutController.js";

const router = express.Router();

router.post("/", protect, createCheckOut);

export default router;
