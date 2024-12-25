import { create } from "zustand";
import axios from "../../config/customAxios";

interface setCollaboratorsToProjectStore {
    addUserLoading: boolean;
    collaborators: string[];
    setCollaboratorsToProject: (collaborators: string[], projectId: string) => Promise<void>;
}

export const useSetCollaboratorsToProjectStore = create<setCollaboratorsToProjectStore>(
    (set) => ({
        addUserLoading: false,
        collaborators: [],
        setCollaboratorsToProject: async (collaborators, projectId) => {
            set({ addUserLoading: true });
            try {
                await axios.put(`/projects/add-users/${projectId}`, { userIds: collaborators });
                set({ collaborators });
            } catch (error) {
                console.error(error);
            } finally {
                set({ addUserLoading: false });
            }
        },
    })
);