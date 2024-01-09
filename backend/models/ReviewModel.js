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
            },
            include: {
                post: true
            }
        })

        const userVendorId = reviewCreated.post.user_id;

        //We need to calculate the average score of the user who has been reviewed when we create a new review
        const reviews = await prismadb.review.findMany({
            include: {
                post: true
            }
        });

        //Getting the reviews that the vendor has.
        const postReviewed = reviews.filter(review => review.post.user_id === userVendorId);
        //console.log(postReviewed);
        //Adding all scores
        const sumOfReviews = postReviewed.map(review => review.review_punctuation).reduce((acc, current) => acc + current, 0);
        //console.log(sumOfReviews);
        const numOfReviews = postReviewed.length;
        //Getting average score (integer)
        const averageScore = Math.floor((sumOfReviews / numOfReviews)) || 0;

        //Updating vendor score
        const vendorUpdated = await prismadb.user_Client.update({
            where: {
                user_id: userVendorId
            },
            data: {
                user_ranking: averageScore
            }
        })

        //Updating state of the post reviewed.
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

    static async getAllById(vendorId) {


        const posts = await prismadb.post.findMany({
            where: {
                AND: [
                    { user_id: vendorId },
                    { post_reviewed: true },
                    {
                        post_buyed: true
                    }
                ]
            }
        });

        const postsIds = posts.map(post => post.post_id);

        const reviews = await prismadb.review.findMany({
            where: {
                post_id: {
                    in: postsIds
                }
            },
            include: {
                user_buyer: true,
                post: true
            }
        });


        return reviews;
    }

}