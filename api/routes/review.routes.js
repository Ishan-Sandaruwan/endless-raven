import express from "express";
import {
  addReview,
  getReviews,
  updateReviews,
  deleteReviews,
} from "../controllers/review.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add-new", verifyToken, addReview);
router.get("/get-reviews", getReviews);
router.put("/update/:reviewId", verifyToken, updateReviews);
router.delete("/delete/:reviewId", verifyToken, deleteReviews);

export default router;
