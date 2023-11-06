import { PrismaClient } from "@prisma/client";
import fs from 'fs/promises';
import sharp from 'sharp';

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
            //Create post

            const newPost = await prismadb.post.create({
                data: {
                    post_title: post_data.title,
                    post_description: post_data.description,
                    post_condition: post_data.state.toLowerCase(),
                    user_id: user_id,
                    platform_id: platform.platform_id,
                    genre_id: genre.genre_id,
                    post_photos: [post_file.filename],
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

    static async getCategories(reqBody) {
        try {
            const categories = await prismadb.platform.findMany();
            //console.log(categories);
            return [1, categories]
        }
        catch (error) {
            console.log(error);
        }
    }

}