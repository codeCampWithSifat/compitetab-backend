import express from "express";
import { protect, admin } from "../middleware/AuthMiddleware.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.post("/", protect, admin, createUser);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
