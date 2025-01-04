import { create } from "zustand";
import axios from "../../config/customAxios"
import { User } from "../UserStore/useBulkUsersStore";

interface user {
    _id: string;
}

interface singleProject {
    name: string;
    _id: string;
    users: User[];
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

    selectedProjectId: string,
    setSelectedProjectId: (projectId: string) => void;

    isSingleProjectLoading: boolean;
    project: singleProject;
    fetchSingleProject: () => Promise<void>;
}

export const useProjectsStore = create<BulkProjectsStore>((set, get) => ({
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
    },
    isSingleProjectLoading: false,
    project: {
        name: "",
        _id: "",
        users: []
    },

    selectedProjectId: "",
    setSelectedProjectId: (projectId: string) => {
        set({ selectedProjectId: projectId });
    },
    fetchSingleProject: async () => {
        const projectId = get().selectedProjectId;
        try {
            set({ isSingleProjectLoading: true });
            const response = await axios.get(`/projects/get/${projectId}`);
            set({ project: response.data.project });
        } catch (error) {
            console.log(error);
        } finally {
            set({ isSingleProjectLoading: false });
        }
    }
}));