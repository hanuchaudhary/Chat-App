import { Users} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomInput from "./BottomInput";
import { Chat } from "./Chat";
import { useEffect, useState } from "react";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../../config/customSocket";

export default function ChatBar({
  handleOpen,
  project,
}: {
  handleOpen: () => void;
  project: any;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function handleSendMessage() {
    if (message.trim()) {
      sendMessage("sendMessage", {
        message: message,
        senderId: user._id,
      });
      setMessage("");
    }
  }

  useEffect(() => {
    initializeSocket(project._id);
    receiveMessage("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Clean up socket connection
    };
  }, [project._id]);

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-[85vh] relative bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="p-4 flex justify-end items-center w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="bg-white dark:text-black font-semibold rounded-full p-3 shadow-lg hover:bg-neutral-200 transition-colors duration-200"
          >
            <Users size={24} />
          </motion.button>
        </div>
        <div className="flex-grow overflow-y-auto px-4 py-2">
          <AnimatePresence>
            <Chat messages={messages} currentUser={user} />
          </AnimatePresence>
        </div>
      </div>
      <BottomInput
        onclick={handleSendMessage}
        onchange={(e) => setMessage(e.target.value)}
        value={message}
      />
    </motion.div>
  );
}
