import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prismadb = new PrismaClient(); //Move to external module

export class UserModel {

    static async register(user_data) {

        try {

            let returnState = 1;

            //Check if the user email is already registered in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    user_email: user_data.email
                }
            })

            if (user !== null) {
                console.log("User already exists!");
                returnState = -1;
                return [returnState, null];
            }

            //If the user does not exist in the database we proceed to insert the request data

            //Password encryption with salt
            const salt = await bcrypt.genSalt(2);

            const hashedPassword = await bcrypt.hash(user_data.password, salt);

            //Inserting the user
            const newUser = await prismadb.user.create({
                data: {
                    user_email: user_data.email,
                    user_password: hashedPassword,
                    user_salt: salt,
                    user_name: user_data.username
                }
            });

            const newClient = await prismadb.user_Client.create({
                data: {
                    user_id: newUser.user_id,
                    user_name: user_data.username,
                    user_photo: "",
                    user_phone: ""
                }
            })

            //We sign the JWT token to send it to the client.
            let token_generated = jwt.sign({ user_id: newClient.user_id, user_email: newClient.user_email, user_role: "client" },
                process.env.TOKEN_SECRET, { expiresIn: '1h' });


            return [returnState, token_generated];

        } catch (error) {
            console.log(error);
        }

    }

    static async login(user_data) {
        try {

            let returnState = 1;

            //Check if the user email exists in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    user_email: user_data.email
                }
            })

            //If the user does not exist in the database we return an error.
            if (user === null) {
                console.log("User does not exist!");
                returnState = -1;
                return [returnState, null];
            }


            //Check if the received password is equal to the one stored in the database for this user
            const passwordValidation = await bcrypt.compare(user_data.password, user.user_password);

            if (!passwordValidation) {
                console.log("passwords do not match!");
                returnState = -1;
                return [returnState, null];
            }


            //We sign the JWT token to send it to the client.
            let token_generated = jwt.sign({ user_id: user.user_id, user_email: user.user_email, user_role: "client" },
                process.env.TOKEN_SECRET, { expiresIn: '1h' });

            return [returnState, token_generated];

        } catch (error) {
            console.log(error);
        }

    }

    static async delete(user_data) {
        try {

            //console.log(user_data.userId);

            const deletedUser = await prismadb.user.update({
                where: {
                    user_id: user_data.userId
                },
                data: {
                    user_active: false
                }
            })


            if (deletedUser === null) {
                throw new Error("Non existent user.");
            }

            return 1;

        } catch (error) {
            console.log(error);
        }
    }

    static async findByType(type) {
        try {
            const result = await prismadb.user.findMany({ where: { user_type: type } })

            return result;
        } catch (err) {
            throw new Error("User type invalid")
        }
    }

    static async getData(userId) {
        try {
            const user = await prismadb.user_Client.findUnique({ where: { user_id: userId } })
            //console.log(user);
            return user.user_name;
        } catch (err) {
            console.log(err);
        }
    }

    static async getUserStats(userId) {
        try {
            const user = await prismadb.user_Client.findUnique({ where: { user_id: userId } });

            const purchases = await prismadb.purchase.findMany({ where: { user_buyer_id: userId } });

            const numPurchases = purchases.length;

            const sells = await prismadb.purchase.findMany({
                include: {
                    post: true
                }
            });

            const numSells = sells.filter(purchase => purchase.post.user_id === userId && purchase.post.post_buyed).length;

            const reviews = await prismadb.review.findMany({
                include: {
                    post: true
                }
            })

            const postReviewed = reviews.filter(review => review.post.post_reviewed && review.post.user_id === userId);
            const sumOfReviews = postReviewed.map(review => review.review_punctuation).reduce((acc, current) => acc + current, 0);
            const numOfReviews = postReviewed.length;
            const averageScore = Math.floor((sumOfReviews / numOfReviews)) || 0;

            return { user: user, numPurchases: numPurchases, numSells: numSells, averageScore: averageScore };
        } catch (err) {
            console.log(err);
        }
    }

    static async sendData(body, userId) {
        try {

            if (body.username) {
                const user = await prismadb.user_Client.update({
                    where: { user_id: userId },
                    data: { user_name: body.username }
                })
                return user;
            }
            else if (body.email) {
                const user = await prismadb.user_Client.update({
                    where: { user_id: userId },
                    data: { user_email: body.email }
                })
                return user;
            }

            //console.log(user);
            return 1;

        } catch (err) {
            console.log(err);
        }
    }

    static async getFavorites(userId) {
        try {
            const favorites = await prismadb.user.findUnique({
                where: {
                    user_id: userId
                },
                include: {
                    Post_Favorites: true
                }
            })
            //console.log(user);
            return favorites.Post_Favorites;
        } catch (err) {
            console.log(err);
        }
    }

    static async toggleFavorite(userId, postId) {
        try {
            const post = await prismadb.post.findUnique({
                where: {
                    post_id: postId
                },
                include: {
                    User_Favorites: true
                }
            })
            let curFavorite = post.User_Favorites.filter((u => u.user_id === userId))

            let fav = {}

            if (curFavorite.length > 0) {
                fav = await prismadb.user.update({
                    where: {
                        user_id: userId,
                    },
                    data: {
                        Post_Favorites: {
                            disconnect: { post_id: postId }
                        }
                    }
                })
            } else if (post) {
                fav = await prismadb.user.update({
                    where: {
                        user_id: userId,
                    },
                    data: {
                        Post_Favorites: {
                            connect: { post_id: postId }
                        }
                    }
                })
            }

            return fav;
        } catch (err) {
            console.log(err);
        }
    }

    static async getRanking() {
        const topVendors = await prismadb.user_Client.findMany({
            take: 3,
            orderBy: [
                {
                    user_ranking: 'desc'
                }
            ],
            where: {
                NOT: [{
                    user_ranking: null
                }

                ]
            }
        })

        return topVendors;
    }

}