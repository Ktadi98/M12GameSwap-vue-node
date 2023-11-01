import { PrismaClient } from "@prisma/client";


const prismadb = new PrismaClient(); //Move to external module

export class PostModel {

    static async register(user_data) {

        try {

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

}