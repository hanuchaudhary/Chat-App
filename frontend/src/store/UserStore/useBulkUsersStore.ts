import { create } from "zustand";
import axios from "../../config/customAxios";

export interface User{
    _id: string;
    email: string;
}

interface bulkUsersStoreType {
    users: User[];
    fetchUsers: () => Promise<void>;
    isloading: boolean;
    error: string;
}

export const useBulkUsersStore = create<bulkUsersStoreType>((set) => ({
    users: [],
    isloading: false,
    error: "",
    fetchUsers: async () => {
        set({ isloading: true });
        try {
            const response = await axios.get("/users/bulk");
            const data = response.data.users;
            set({ users: data, isloading: false });
        } catch (error: any) {
            set({ error: error.message, isloading: false });
        }
    },
}));