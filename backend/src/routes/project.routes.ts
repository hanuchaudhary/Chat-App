import { Router } from "express";
import { addUserToProject, createProject, getProjectById, getProjects } from "../controllers/project.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export const projectRouter = Router();

projectRouter.post("/create", authMiddleware, createProject);

projectRouter.get("/bulk", authMiddleware, getProjects);

projectRouter.put("/add-users/:projectId", authMiddleware, addUserToProject);

projectRouter.get("/get/:projectId", authMiddleware, getProjectById
);