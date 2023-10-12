import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prismadb = new PrismaClient();

export class UserModel {

    static async register(user_data) {

        try {

            //Check if the user email is already registered in the database.
            const user = await prismadb.user.findFirstOrThrow({
                where: {
                    user_email: user_data.email
                }
            })

            //If the user does not exist in the database we proceed to insert the request data

            //Password encryption with salt
            const salt = await bcrypt.genSalt(2);
            const hashedPassword = await bcrypt.hash(user_data.password, salt);

            //Inserting the user
            const newUser = await prismadb.user.create({
                data: {
                    user_email: user_data.email,
                    user_password: hashedPassword,
                    user_salt: salt
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

        } catch (error) {
            console.log(error.code, error.meta);
            return -1;
        }

    }

    static async login(user_data) {

    }


}