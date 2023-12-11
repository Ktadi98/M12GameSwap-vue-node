import { validateUploadedPost } from '../schemas/posts.js'
import "dotenv/config";

export class ReviewController {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }

    create = async (req, res) => {

        const postId = Number(req.params.postId);
        const userId = req.user_id;
        const reviewTitle = req.body.title;
        const reviewDescription = req.body.description;
        const reviewPuntuaction = req.body.puntuaction;

        const newReview = await this.reviewModel.create(postId, userId, reviewTitle, reviewDescription, reviewPuntuaction);

        return res.json({ review: newReview, message: "Review created successfully" });

    }
}
