import { Router } from "express";
import { ReviewController } from "../controllers/ReviewController.js";
import { authenticateToken } from "../middlewares/token.js";
import { upload } from "../middlewares/multer.js";

export const createReviewRouter = (reviewModel) => {
    const reviewRouter = Router();

    const reviewController = new ReviewController(reviewModel);
    reviewRouter.post("/post/:postId", authenticateToken, reviewController.create);
    return reviewRouter;
};
