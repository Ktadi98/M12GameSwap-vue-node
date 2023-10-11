import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const createUserRouter = () => {
  const userRouter = Router();

  const userController = new UserController();

  userRouter.get("/", userController.getAll);

  return userRouter;
};
