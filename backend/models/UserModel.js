import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prismadb = new PrismaClient();

export class UserModel {

    static async register(user_data) {

        try {

            //Check if the user email is already registered in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    user_email: user_data.email
                }
            })

            if (user !== null) {
                throw new Error("The user already exists!");
            }

            //If the user does not exist in the database we proceed to insert the request data
            console.log(user_data.password);
            //Password encryption with salt
            const salt = await bcrypt.genSalt(2);

            console.log(salt);
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

            return 1;

        } catch (error) {
            console.log(error);
        }

    }

    static async login(user_data) {
        try {

            //Check if the user email exists in the database.
            const user = await prismadb.user.findFirst({
                where: {
                    user_email: user_data.email
                }
            })

            //If the user does not exist in the database we return an error.
            if (user === null) {
                throw new Error("Non existent user.");
            }

            //Check if the received password is equal to the one stored in the database for this user
            const passwordValidation = await bcrypt.compare(user_data.password, user.user_password);

            if (!passwordValidation) {
                throw new Error("Passwords do not match!");
            }

            return 1;

        } catch (error) {
            console.log(error);
        }

    }
}