import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter = Router();

userRouter.post("/register", userController.registerUserController);

userRouter.post("/login", userController.loginUserController);

userRouter.get("/profile", authMiddleware, userController.profileController);

userRouter.post("/logout", authMiddleware, userController.logoutController);

userRouter.get("/bulk", authMiddleware, userController.bulkUsersController);
