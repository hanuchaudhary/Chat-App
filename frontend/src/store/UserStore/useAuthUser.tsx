import { create } from "zustand";

interface AuthUser {
  user: {
    id: string;
    email: string;
    token: string;
  };
}

const localuser = localStorage.getItem("user");
const localuserObj = localuser ? JSON.parse(localuser) : {};

export const useAuthUser = create<AuthUser>(() => ({
  user: {
    id: localuserObj._id || "",
    email: localuserObj.email || "",
    token: localuserObj.token || "",
  },
}));
