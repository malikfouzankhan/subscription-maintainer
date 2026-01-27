import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createSubscription,getSubscriptions,deleteSubscription } from "../controllers/subscription.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSubscription);
router.get("/", getSubscriptions);
router.delete("/:id", deleteSubscription);

export default router;