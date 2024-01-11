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
                }
            })

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
            /**const platform = await prismadb.post.findMany({
                where: {
                    platform_id: {
                        contains: categoryName,
                        mode: "insensitive",
                    },
                },
            });
            if (!platform) {
                return [];
            }**/
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
}