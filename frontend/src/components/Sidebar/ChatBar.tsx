import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomInput from "./BottomInput";
import { Chat } from "./Chat";

export default function ChatBar({ handleOpen }: { handleOpen: () => void }) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-[85vh] relative bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="flex-grow relative overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 p-4 flex justify-end items-center ">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="bg-white dark:text-black font-semibold rounded-full p-3 shadow-lg hover:bg-neutral-200 transition-colors duration-200"
          >
            <Users size={24} />
          </motion.button>
        </div>
        <AnimatePresence>
          <Chat />
        </AnimatePresence>
      </div>
      <BottomInput />
    </motion.div>
  );
}
