import { Request, Response } from "express";
import { projectSchema, projectUpdateSchema } from "../types/projectTypes";
import projectModel from "../models/project.model";
import mongoose from "mongoose";

export const createProject = async (req: Request, res: Response) => {
    const payload = projectSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(400).json(payload.error);
        return;
    }

    try {

        const project = await projectModel.create({
            name: payload.data.name,
            users: req._id
        })

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project

        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Server Error" });
    }
}

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = (await projectModel.find({ users: req._id }).populate('users', '-password'));
        res.status(200).json({
            success: true,
            projects
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Server Error" });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId;
        const project = await projectModel.findOne({ _id: projectId }).populate('users', '-password');
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json({
            success: true,
            project
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Server Error" });
    }
}

export const deleteProject = async (req: Request, res: Response) => {
    try {
        await projectModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Server Error" });
    }
}

export const addUserToProject = async (req: Request, res: Response) => {
    const payload = projectUpdateSchema.safeParse(req.body);
    if (!payload.success) {
        res.status(400).json(payload.error);
        return;
    }
    const { userIds } = payload.data
    const projectId = req.params.projectId;

    try {

        const isValidProjectId = mongoose.Types.ObjectId.isValid(projectId);
        if (!isValidProjectId) {
            res.status(400).json({ message: "Invalid Project ID" });
            return;
        }

        const isValidUserIds = payload.data.userIds.every((id: string) => mongoose.Types.ObjectId.isValid(id));
        if (!isValidUserIds) {
            res.status(400).json({ message: "Invalid User ID" });
            return;
        }

        const project = await projectModel.findOne({
            _id: projectId,
            users: req._id
        })

        if (!project) {
            res.status(404).json({ message: "Project not belongs to user" });
            return;
        }

        const addUsers = await projectModel.findOneAndUpdate({
            _id: projectId
        }, {
            $addToSet: {
                users: userIds
            }
        }, {
            new: true
        })
        console.log("addUsers", addUsers);

        res.status(200).json({
            success: true,
            message: "Users added to project successfully",
            project: addUsers
        });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Internal Server Error" });
    }
}