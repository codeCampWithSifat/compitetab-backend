import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import { getAllProducts } from "../controllers/ProductAdminController.js";

const router = express.Router();

router.get("/", protect, admin, getAllProducts);

export default router;
