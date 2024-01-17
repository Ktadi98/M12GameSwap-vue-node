import { Router } from "express";
import { ComplaintController } from "../controllers/ComplaintController.js";
import { authenticateToken } from "../middlewares/token.js";

export const createComplaintRouter = (complaintModel) => {
    const complaintRouter = Router();

    const complaintController = new ComplaintController(complaintModel);

    complaintRouter.post("/:postId", authenticateToken, complaintController.create);
    complaintRouter.get("/:userId", authenticateToken, complaintController.getAll);

    return complaintRouter;
};
