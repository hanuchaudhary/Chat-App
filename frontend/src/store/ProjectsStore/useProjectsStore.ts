import { create } from "zustand";
import axios from "../../config/customAxios"

interface user {
    _id: string;
}

export interface projects {
    name: string;
    _id: string;
    users: user[];
}

interface BulkProjectsStore {
    isLoading: boolean;
    projects: projects[];
    fetchProjects: () => Promise<void>;
    createProject: (projectName: string) => Promise<void>;
}

export const useProjectsStore = create<BulkProjectsStore>((set) => ({
    isLoading: true,
    projects: [],
    fetchProjects: async () => {
        try {
            const response = await axios.get("/projects/bulk");
            console.log(response.data);
            set({ projects: response.data.projects });
        } catch (error) {
            console.log(error);
        } finally {
            set({ isLoading: false });
        }
    },
    createProject: async (projectName: string) => {
        try {
            const response = await axios.post("/projects/create", { name: projectName });
            set({ projects: [...response.data.project] });
        } catch (error) {
            console.log(error);
        }
    }
}));