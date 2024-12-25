import { X } from "lucide-react";
import UserTile from "./UserTile";
import { motion } from "framer-motion";
import { User } from "../../store/UserStore/useBulkUsersStore";

export default function SlidingSidebar({
  handleOpen,
  users,
}: {
  handleOpen: () => void;
  users: User[];
}) {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2, type: "tween" }}
      exit={{ x: -400, transition: { duration: 0.2 } }}
      className="h-full z-[9999] fixed bg-neutral-800 w-96 shadow-lg rounded-r-xl"
    >
      <div className="p-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-white text-xl">Collaborators</h1>
          <div className="">
            <X
              onClick={handleOpen}
              className="text-black h-7 w-7 font-semibold cursor-pointer bg-white rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          {users.map((user) => (
            <UserTile key={user._id} {...user} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
