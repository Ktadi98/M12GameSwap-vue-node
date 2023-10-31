import { validateUploadedPost } from '../schemas/posts.js'

export class PostController {
    constructor(postModel) {
        this.postModel = postModel;
    }

    getAll = async (req, res) => {

        res.json("All posts");
    };

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

}
