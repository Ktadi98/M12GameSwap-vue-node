import { PrismaClient } from "@prisma/client";


const prismadb = new PrismaClient(); //Move to external module

export class PostModel {

    static async create(post_data) {

        try {

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

            // const newPost = await prismadb.post.create({
            //     data: {
            //         post_title: post_data.title,
            //         post_description: post_data.description,
            //         post_condition: post_data.state,
            //         user_id: post_data.user_id,
            //         platform_id: platform.platform_id,
            //         genre_id: genre.genre_id,
            //         post_photos: [],
            //         post_price: post_data.price
            //     }
            // })

        } catch (error) {
            console.log(error);
        }

    }

}