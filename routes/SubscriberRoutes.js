import express from "express";
import { newslaterSubsciption } from "../controllers/SubscriberController.js";

const router = express.Router();

router.post("/", newslaterSubsciption);

export default router;
