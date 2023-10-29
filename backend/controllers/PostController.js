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

        //Apply validation schema to the data received
        const postValidated = validateUploadedPost(req.body);

        if (!postValidated.success) {
            return res.status(422).json({ error: JSON.parse(postValidated.error.message) })
        }

        //this.postModel.create

    }

}
