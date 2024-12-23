import e, { Request, Response } from "express";
import { userSchema } from "../types/userTypes";
import * as userService from "../services/user.service";
import jwt from 'jsonwebtoken'

export const registerUserController = async (req: Request, res: Response) => {
    const payload = userSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(400).json(payload.error);
        return;
    }

    try {
        const user = await userService.createUser({ email: payload.data.email, password: payload.data.password });

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ user, token });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Server Error" });
        return;
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    const payload = userSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(400).json(payload.error);
        return;
    }

    try {
        const user = await userService.loginUser({ email: payload.data.email, password: payload.data.password });

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ user, token });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

export const profileController = async (req: Request, res: Response) => {
    res.status(200).json({
        user: req.user
    });

}

export const logoutController = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        res.status(200).json({
            message: "Logged Out"
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}