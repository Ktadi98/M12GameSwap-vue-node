import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authenticateToken } from "../middlewares/token.js";

export const createUserRouter = (userModel) => {
  const userRouter = Router();

  const userController = new UserController(userModel);

  userRouter.get("/", userController.getAll);
  userRouter.post("/register", userController.register);
  userRouter.post("/login", userController.login);
  userRouter.delete("/delete", userController.delete);
  userRouter.post("/activate", userController.activate);
  userRouter.get("/type/:type", userController.getByType);
  userRouter.get("/getData", authenticateToken, userController.getData);
  userRouter.get("/getStats/:userId", userController.getUserStats);
  userRouter.get("/getStatsAuth", authenticateToken, userController.getUserStatsAuth);
  userRouter.get("/favorites", authenticateToken, userController.getFavorites)
  userRouter.put("/favorites", authenticateToken, userController.toggleFavorite)
  userRouter.get("/ranking", userController.getRanking);
  userRouter.post("/sendData", authenticateToken, userController.sendData)

  // userRouter.get("/test", authenticateToken, (req, res, next) => {
  //   console.log(req.user_email);
  //   console.log("test");
  //   res.status(202).json({ message: "token verified successfully!" })
  // })

  return userRouter;
};
