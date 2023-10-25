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

            const deletedUser = await prismadb.user.delete({
                where: {
                    user_id: user_data.userId
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
}