import e, { Request, Response } from "express";
import { userSchema } from "../types/userTypes";
import jwt from 'jsonwebtoken'
import { redisClient } from "../services/redis.service";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt';

export const registerUserController = async (req: Request, res: Response) => {
    const payload = userSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(400).json(payload.error);
        return;
    }

    try {
        const userExists = await userModel.findOne({
            email: payload.data.email
        });

        if (userExists) {
            res.status(400).json({ message: "User Already Exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(payload.data.password, 10);
        const user = await userModel.create({
            email: payload.data.email,
            password: hashedPassword
        })

        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: "JWT_SECRET is not defined" });
            return;
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(201).json({
            user: {
                _id: user._id,
                email: user.email
            }, token
        });
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
        const user = await userModel.findOne({
            email: payload.data.email
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(payload.data.password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Password" });
            return;
        }

        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: "JWT_SECRET is not defined" });
            return;
        }
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            user: {
                _id: user._id,
                email: user.email,
            }, token
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

export const profileController = async (req: Request, res: Response) => {
    res.status(200).json({
        user: {
            _id: req._id,
            email: req.email
        }
    });

}

export const logoutController = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (token) {
            await redisClient.set(token, "logged out", "EX", 60 * 60 * 24);
        } else {
            res.status(400).json({ message: "Token is missing" });
            return;
        }

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

export const bulkUsersController = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find({
            _id: { $ne: req._id }
        }, { password: 0 });
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}