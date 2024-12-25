import { X } from 'lucide-react';
import UserTile from "./UserTile";
import { motion, AnimatePresence } from "framer-motion";
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
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full z-[9999] fixed left-0 top-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 w-96 shadow-2xl rounded-r-3xl overflow-hidden"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center w-full mb-8">
          <motion.h1 
            className="text-white text-3xl font-bold"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Collaborators
          </motion.h1>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X
              onClick={handleOpen}
              className="text-purple-900 h-8 w-8 font-bold cursor-pointer bg-white rounded-full p-1.5 shadow-lg hover:bg-purple-100 transition-colors duration-200"
            />
          </motion.div>
        </div>
        <motion.div 
          className="flex-grow overflow-y-auto pr-2 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence>
            {users.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <UserTile {...user} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.div 
          className="mt-6 text-center text-white text-sm opacity-60"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 0.4 }}
        >
          {users.length} collaborators
        </motion.div>
      </div>
    </motion.div>
  );
}
