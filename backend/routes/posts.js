import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
//import { authenticateToken } from "../middlewares/token.js";

export const createPostRouter = (postModel) => {
    const postRouter = Router();

    const postController = new PostController(postModel);

    postRouter.get("/", postController.getAll);


    return postRouter;
};
