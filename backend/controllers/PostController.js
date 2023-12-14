import { validateUploadedPost } from '../schemas/posts.js'
import "dotenv/config";

export class PostController {
    constructor(postModel) {
        this.postModel = postModel;
    }

    getAll = async (req, res) => {

        res.json("All posts");
    };

    getById = async (req, res) => {
        const post = await this.postModel.getById(req.params.id);
        return res.json({ post: post });
    }

    //Method to store a new post in the DB.
    create = async (req, res) => {

        //console.log(req.file);
        //Transfrom price to number
        req.body.price = Math.floor(Number(req.body.price));

        //Apply validation schema to the data received
        const postValidated = validateUploadedPost(req.body);

        if (!postValidated.success) {
            return res.status(422).json({ error: JSON.parse(postValidated.error.message) })
        }

        const returnState = await this.postModel.create(req.body, req.file, req.user_id);

        if (returnState === 1) {
            console.log("Post created successfully!");
            return res.json({ message: "post created succesfully" });
        }

        return res.status(500).json({ error: "User could not be registered!" })

    }

    getImages = async (req, res) => {


        const status = await this.postModel.getImages(req.file);

        if (status === 1) {
            console.log("Éxito!!")
            return res.json({ file: `${process.env.PHOTOS_URL}/${req.file.originalname}` });
        }
        return res.status(500).json({ error: "Images could not be retrieved" });
    };

    getCategories = async (req, res) => {
        const [status, categories] = await this.postModel.getCategories(req.body);

        return res.json({ message: "Categories retrieved successfully!", categories: categories });
    };

    getPostByCategory = async (req, res) => {
        const category_id = req.params.id;

        try {
            const posts = await this.postModel.getPostsByCategory(Number(category_id));

            if (posts.length > 0) {
                return res.json({ message: "Posts retrieved successfully!", posts: posts });
            } else {
                return res.json({ message: `No se encontraron posts en la categoría: ${category_id}`, posts: [] });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener los posts por categoría" });
        }
    };

    // getPostByCategory = async (req, res) => {
    //     const category_id = req.params.id;

    //     try {
    //         const posts = await this.postModel.getPostsByCategory(Number(category_id));

    //         if (posts.length > 0) {
    //             return res.json({ message: "Posts retrieved successfully!", posts: posts });
    //         } else {
    //             return res.json({ message: `No se encontraron posts en la categoría: ${category_id}`, posts: [] });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: "Error al obtener los posts por categoría" });
    //     }
    // };

    getPostByCategoryLogIn = async (req, res) => {
        const category_id = Number(req.params.id);

        try {
            const posts = await this.postModel.getPostsByCategoryLogIn(category_id, req.user_id);

            if (posts.length > 0) {
                return res.json({ message: "Posts retrieved successfully!", posts: posts });
            } else {
                return res.json({ message: `No se encontraron posts en la categoría: ${category_id}`, posts: [] });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener los posts por categoría" });
        }
    }
    getGenres = async (req, res) => {
        const [status, genres] = await this.postModel.getGenres();

        return res.json({ message: "Genres retrieved successfully!", genres: genres });
    };

    getPostsByUserId = async (req, res) => {
        const posts = await this.postModel.getPostsByUserId(req.user_id);
        return res.json({ posts: posts });
    };

    getPostsByQuery = async (req, res) => {

        const query = req.params.searchQuery;

        const posts = await this.postModel.getPostsByQuery(query);
        return res.json({ posts: posts });
    };

    getPostsByQueryLogIn = async (req, res) => {

        const query = req.params.searchQuery;

        const posts = await this.postModel.getPostsByQueryLogIn(query, req.user_id);
        return res.json({ posts: posts });
    };

    getVendorPosts = async (req, res) => {
        const vendorId = Number(req.params.id);
        const posts = await this.postModel.getVendorPosts(vendorId);
        return res.json({ posts: posts });
    };

    deletePost = async (req, res) => {
        const postIdToDelete = Number(req.params.id);
        const [exitState, post] = await this.postModel.deletePost(postIdToDelete);
        if (exitState === 1) {
            return res.json({ post: post });

        }
        return res.status(500).json({ error: "Post could not be dropped" })

    };

    updatePost = async (req, res) => {
        const postIdToPatch = Number(req.params.id);
        const [exitState, updatedPost] = await this.postModel.updatePost(req.body, postIdToPatch, req.user_id, req.file);
        if (exitState === 1) {
            return res.json({ post: updatedPost });
        }

        return res.status(500).json({ error: "Post could not be updated..." });
    };

    getPurchases = async (req, res) => {
        const [exitState, purchasedPosts] = await this.postModel.getPurchases(req.user_id);
        if (exitState === 1) {
            return res.json({ purchasesData: purchasedPosts });
        }

        return res.status(500).json({ error: "Purchases could not be obtained..." });
    };

    setReservation = async (req, res) => {
        const userId = req.user_id;
        const vendorId = Number(req.params.vendorId);
        const postId = Number(req.params.postId);

        const [postReservation, newReservation] = await this.postModel.setReservation(userId, vendorId, postId);

        return res.json({ post: postReservation, reservation: newReservation });
    };

}
