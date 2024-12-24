import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        _id: string;
        email: string;
    }
}
import jwt from "jsonwebtoken";
import { redisClient } from "../services/redis.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization Header is Required" });
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token is Required" });
        return;
    }

    const BlacklistToken = await redisClient.get(token);
    if (BlacklistToken) {
        res.status(403).json({ message: "Token is Blacklisted" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            res.status(403).json({ message: "Invalid Token" });
            return;
        }
        req._id = (user as JwtPayload).id;
        req.email = (user as JwtPayload).email;
        next();
    });
}