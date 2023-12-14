import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
import { authenticateToken } from "../middlewares/token.js";
import { upload } from "../middlewares/multer.js";

export const createPostRouter = (postModel) => {
    const postRouter = Router();

    const postController = new PostController(postModel);

    postRouter.delete("/delete/:id", authenticateToken, postController.deletePost);
    postRouter.get("/", postController.getAll);
    postRouter.get("/categories", postController.getCategories);
    postRouter.get("/genres", postController.getGenres);
    postRouter.get("/user/posts", authenticateToken, postController.getPostsByUserId);
    postRouter.get("/query/:searchQuery", postController.getPostsByQuery);
    postRouter.get("/query/auth/:searchQuery", authenticateToken, postController.getPostsByQueryLogIn);
    postRouter.get("/purchases", authenticateToken, postController.getPurchases);
    postRouter.get("/:id", postController.getById);
    postRouter.get("/vendor/:id", postController.getVendorPosts);
    postRouter.post("/upload", authenticateToken, upload.single('images'), postController.create);
    postRouter.post("/images", authenticateToken, upload.single('images'), postController.getImages);
    postRouter.get("/category/:id", postController.getPostByCategory);
    postRouter.get("/category/auth/:id", authenticateToken, postController.getPostByCategoryLogIn);
    postRouter.patch("/update/:id", authenticateToken, upload.single('images'), postController.updatePost);

    postRouter.patch("/reservation/:vendorId/:postId", authenticateToken, postController.setReservation);

    return postRouter;
};
