import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prismadb = new PrismaClient();

export class ComplaintModel {

    static async create(userId, postId, data) {

        const newComplaint = await prismadb.complaint.create({
            data: {
                complaint_motive: data.motive,
                complaint_text: data.text,
                user_id: userId,
                post_id: postId
            }
        });

        return 1;
    }

    static async getAll(userId) {
        //We obtain the complaints of the posts that are deactivated in the system.
        const complaints = await prismadb.complaint.findMany({
            where: {
                user_id: userId,
                post: {
                    post_status: true
                }
            },
            include: {
                post: true,
                user: true
            }
        });

        return complaints;
    }

}