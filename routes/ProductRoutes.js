import express from "express";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);
router.get("/", getAllProducts);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
