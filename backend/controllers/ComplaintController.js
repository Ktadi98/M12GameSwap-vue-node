import { validateUploadedComplaint } from '../schemas/complaints.js'
import "dotenv/config";

export class ComplaintController {
    constructor(complaintModel) {
        this.complaintModel = complaintModel;
    }

    create = async (req, res) => {

        //Apply validation schema to the data received
        const complaintValidated = validateUploadedComplaint(req.body);

        //Send validation errors
        if (!complaintValidated.success) {
            return res.status(422).json({ error: JSON.parse(complaintValidated.error.message) })
        }

        const postId = Number(req.params.postId);

        const returnState = await this.complaintModel.create(req.user_id, postId, req.body);

        //In case we succeed in creating the complaint, we inform the user.
        if (returnState === 1) {
            console.log("Complaint created successfully!");
            return res.json({ message: "compaint created succesfully" });
        }

        return res.status(500).json({ error: "Error while creating complaint" })

    }

}
