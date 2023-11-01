export class PostController {
    constructor(postModel) {
        this.postModel = postModel;
    }

    getAll = async (req, res) => {

        res.json("All posts");
    };

    getById = async (req, res) => {
        const post = await this.postModel.getById(req.params.id)
        res.json(post)
    }


}
