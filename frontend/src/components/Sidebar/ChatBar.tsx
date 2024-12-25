import { Users } from "lucide-react";
import BottomInput from "./BottomInput";
import { Chat } from "./Chat";
import AddUsersToProject from "../AddUserToProjectDialog";

export default function ChatBar({ handleOpen ,project}: { handleOpen: () => void, project : any }) {
  return (
    <div className="h-full relative bg-neutral-800 w-96 rounded-r-xl">
      <h1 className="py-2 px-4 text-lg font-semibold capitalize text-white">{project.name}</h1>
      <div className="p-4">
        <div className="flex justify-between items-center w-full">
          <AddUsersToProject />
          <div>
            <button
              onClick={handleOpen}
              className="bg-white text-black font-semibold rounded-xl p-2"
            >
              <Users />
            </button>
          </div>
        </div>
        <div className="mt-6">
          <Chat />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <BottomInput />
        </div>
      </div>
    </div>
  );
}
