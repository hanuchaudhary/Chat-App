import { create } from "zustand";
import { User } from "../UserStore/useBulkUsersStore";
import axios from "../../config/customAxios"

interface singleProject {
    name: string;
    _id: string;
    users: User[];
}

interface SingleProjectStore {
    isSingleProjectLoading: boolean;
    project: singleProject;
    fetchSingleProject: (projectId: string) => Promise<void>;
}

export const useSingleProjectStore = create<SingleProjectStore>((set) => ({
    isSingleProjectLoading: false,
    project: {
        name: "",
        _id: "",
        users: []
    },
    fetchSingleProject: async (projectId: string) => {
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