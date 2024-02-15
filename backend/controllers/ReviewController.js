import { validateUploadedReview } from '../schemas/reviews.js'

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

        const reviewValidated = validateUploadedReview(req.body);

        if (!reviewValidated.success) {
            return res.status(422).json({ error: JSON.parse(postValidated.error.message) })
        }

        const newReview = await this.reviewModel.create(postId, userId, reviewTitle, reviewDescription, reviewPuntuaction);

        return res.json({ review: newReview, message: "Review created successfully" });

    }

    getAllById = async (req, res) => {
        const vendorId = Number(req.params.vendorId);
        const vendorReviews = await this.reviewModel.getAllById(vendorId);

        return res.json({ reviews: vendorReviews });
    };
}
