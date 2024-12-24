import Redis from "ioredis";
import "dotenv/config";

export const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
    password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
    console.log("Redis connected");
});