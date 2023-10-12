import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router();

  const userController = new UserController({ userModel });

  userRouter.get("/", userController.getAll);
  userRouter.post("/register", userController.register);

  return userRouter;
};
