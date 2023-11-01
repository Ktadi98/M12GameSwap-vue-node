import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
import { authenticateToken } from "../middlewares/token.js";
import { upload } from "../middlewares/multer.js";

export const createPostRouter = (postModel) => {
    const postRouter = Router();

    const postController = new PostController(postModel);

    postRouter.get("/", postController.getAll);
    postRouter.get("/:id", postController.getById)
    postRouter.post("/upload", authenticateToken, upload.single('images'), postController.create);


    return postRouter;
};
