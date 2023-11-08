import { validateUploadedPost } from '../schemas/posts.js'


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
            return res.json({ file: `http://localhost:8080/public/static/images/${req.file.originalname}` });
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

    getGenres = async (req, res) => {
        const [status, genres] = await this.postModel.getGenres();

        return res.json({ message: "Genres retrieved successfully!", genres: genres });
    };

}
