import { PrismaClient } from "@prisma/client";
import fs from 'fs/promises';
import sharp from 'sharp';
import "dotenv/config";

const prismadb = new PrismaClient(); //Move to external module

export class PostModel {

    static async create(post_data, post_file, user_id) {

        try {

            console.log(post_data);
            console.log(post_file);

            //Fetch category id by name provided in request
            const platform = await prismadb.platform.findFirst({
                where: {
                    platform_name: {
                        contains: post_data.platform,
                        mode: "insensitive"
                    }
                }
            })

            //Fetch genre id by name provided in request
            const genre = await prismadb.genre.findFirst({
                where: {
                    genre_name: {
                        contains: post_data.genre,
                        mode: "insensitive"
                    }
                }
            })

            console.log(platform, genre);



            //Mount image in public directory
            await sharp(post_file.path).toFile(`./public/static/images/${post_file.originalname}`);
            await fs.unlink(post_file.path);


            //Create post
            const newPost = await prismadb.post.create({
                data: {
                    post_title: post_data.title,
                    post_description: post_data.description,
                    post_condition: post_data.state.toLowerCase(),
                    user_id: user_id,
                    platform_id: platform.platform_id,
                    genre_id: genre.genre_id,
                    post_photos: [`${process.env.PHOTOS_URL}/${post_file.originalname}`],
                    post_price: post_data.price
                }
            })

            console.log(newPost);

            return 1;

        } catch (error) {
            console.log(error);
        }

    }

    static async getById(id) {
        try {
            const result = await prismadb.post.findFirst({
                where: {
                    post_id: +id
                },
                include: { //Adding the vendor information of this post - SPRINT 4
                    user_client: true
                }
            })
            console.log(result);

            return result
        } catch (err) {
            console.error(err)
        }
    }

    static async getImages(postImage) {
        try {
            console.log(postImage)
            await sharp(postImage.path).toFile(`./public/static/images/${postImage.originalname}`);
            await fs.unlink(postImage.path);
            return 1;
        } catch (error) {
            console.log(error);
        }
    }

    static async getCategories() {
        try {
            const categories = await prismadb.platform.findMany();
            //console.log(categories);
            return [1, categories]
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getPostsByCategory(category_id) {
        try {
            // const platform = await prismadb.post.findMany({
            //     where: {
            //         platform_id: {
            //             contains: categoryName,
            //             mode: "insensitive",
            //         },
            //     },
            // });
            // if (!platform) {
            //     return [];
            // }
            const posts = await prismadb.post.findMany({
                where: {
                    AND: [
                        { platform_id: category_id },
                        { post_status: true }
                    ]
                }
            });

            return posts;
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getPostsByCategoryLogIn(category_id, userId) {
        try {


            const posts = await prismadb.post.findMany({
                where: {
                    AND: [
                        { platform_id: category_id },
                        { post_status: true },
                    ],
                    NOT: {
                        user_id: userId
                    }
                }
            });

            return posts;
        }
        catch (error) {
            console.log(error);
        }
    }


    static async getGenres() {
        try {
            const genres = await prismadb.genre.findMany();
            //console.log(categories);
            return [1, genres]
        }
        catch (error) {
            console.log(error);
        }
    }

    static async getPostsByUserId(req_user_id) {
        const posts = await prismadb.post.findMany({
            where: {
                AND: [
                    { user_id: req_user_id },
                    { post_status: true }
                ]
            }
        });

        return posts;
    };

    static async getPostsByQuery(query) {
        const posts = await prismadb.post.findMany({
            where: {
                AND: [
                    {
                        post_title: {
                            startsWith: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        post_status: true
                    }
                ]

                //TODO:Añadir tags incluidos, sprint 4
            },
            include:
            {
                platform: true,
            }
        });

        return posts;
    };

    static async getPostsByQueryLogIn(query, userId) {
        const posts = await prismadb.post.findMany({
            where: {
                AND: [
                    {
                        post_title: {
                            startsWith: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        post_status: true
                    }
                ],
                NOT: {
                    user_id: userId
                }

                //TODO:Añadir tags incluidos??
            },
            include:
            {
                platform: true,
            }
        });

        return posts;
    };

    static async getVendorPosts(vendorId) {
        const posts = await prismadb.post.findMany({
            where: {
                AND: [
                    { user_id: vendorId },
                    { post_status: true }
                ]
            }
        });

        //Maybe we need to get the vendor information here?? /SPRINT 4

        return posts;
    }

    static async deletePost(postIdToDelete) {
        const post = await prismadb.post.update({
            where: {
                post_id: postIdToDelete
            },
            data: {
                post_status: false
            }
        });

        return [1, post];
    }

    static async updatePost(data, postIdToPatch, userId, post_file) {
        //Fetch category id by name provided in request
        const platform = await prismadb.platform.findFirst({
            where: {
                platform_name: {
                    contains: data.platform,
                    mode: "insensitive"
                }
            }
        });

        //Fetch genre id by name provided in request
        const genre = await prismadb.genre.findFirst({
            where: {
                genre_name: {
                    contains: data.genre,
                    mode: "insensitive"
                }
            }
        });

        //Mount image in public directory
        //public/static/images directory must be previously created!

        await sharp(post_file.path).toFile(`./public/static/images/${post_file.originalname}`);
        await fs.unlink(post_file.path);

        const updatedPost = await prismadb.post.update({
            where: {
                post_id: postIdToPatch
            },
            data: {
                post_title: data.title,
                post_description: data.description,
                post_price: Math.floor(Number(data.price)),
                post_condition: data.state.toLowerCase(),
                platform_id: platform.platform_id,
                genre_id: genre.genre_id,
                post_photos: [`${process.env.PHOTOS_URL}/${post_file.originalname}`]
            }
        });

        return [1, updatedPost];
    }

    static async getPurchases(userId) {
        const purchases = await prismadb.purchase.findMany({
            where: {
                user_buyer_id: userId
            },
            include: {
                post: {
                    include: {
                        user_client: true
                    }
                }

            }
        });

        return [1, purchases];
    }

    static async setReservation(userId, postId) {

        const post = await prismadb.post.findFirst({
            where: {
                post_id: postId
            }
        });

        const statusReserved = post.post_reserved ? false : true;

        const postReservation = await prismadb.post.update({
            where: {
                post_id: post.post_id
            },
            data: {
                post_reserved: statusReserved
            }
        })

        const newReservation = await prismadb.reservation.create({
            data: {
                user_reserver_id: userId,
                post_id: postReservation.post_id
            }
        })

        return [postReservation, newReservation];
    }

    static async getSells(userId) {
        const purchases = await prismadb.purchase.findMany({
            include: {
                post: true,
                user: true
            }
        });

        const userSells = purchases.filter(purchase => purchase.post.user_id === userId);

        return [1, userSells];
    }

    static async getReservations(userId) {
        const reservations = await prismadb.reservation.findMany({
            where: {
                user_reserver_id: userId
            },
            include: {
                post: {
                    include: {
                        user_client: true
                    }
                }
            }
        });

        return [1, reservations];
    }

    static async deleteReservation(reservationIdToDelete) {
        const reservation = await prismadb.reservation.findFirst({
            where: {
                reservation_id: reservationIdToDelete
            },
            include: {
                post: true
            }
        });

        //Actualizar el estado de reserva del producto concreto.
        const post = await prismadb.post.update({
            where: {
                post_id: reservation.post_id
            },
            data: {
                post_reserved: false
            }
        })

        //Eliminar el la reserva de la tabla pertinente.
        const deletion = await prismadb.reservation.delete({
            where: {
                reservation_id: reservation.reservation_id
            }
        });

        return [1, deletion];
    }
}