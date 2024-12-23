import { Router } from "express";
import * as userController from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/register", userController.registerUserController);

userRouter.post("/login", userController.loginUserController);
