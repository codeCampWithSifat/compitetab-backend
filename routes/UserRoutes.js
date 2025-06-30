import express from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/UserController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, userProfile);

export default router;
