import express from "express";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import {
  bestSeller,
  createProduct,
  deleteProduct,
  getAllProducts,
  newArrivals,
  similarProduct,
  singleProduct,
  updateProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/", protect, admin, createProduct);
router.get("/", getAllProducts);
router.get("/best-seller", bestSeller);
router.get("/new-arrivals", newArrivals);
router.get("/:id", singleProduct);
router.get("/similar/:id", similarProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
