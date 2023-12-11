import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prismadb = new PrismaClient(); //Move to external module

export class ReviewModel {
    static async create(postId, userId, reviewTitle, reviewDescription, reviewPuntuaction) {

        const reviewCreated = await prismadb.review.create({
            data: {
                post_id: postId,
                user_buyer_id: userId,
                review_title: reviewTitle,
                review_description: reviewDescription,
                review_punctuation: reviewPuntuaction,
            }
        })

        const postUpdated = await prismadb.post.update({
            where: {
                post_id: postId
            },
            data: {
                post_reviewed: true
            }
        })

        return reviewCreated;
    }


}