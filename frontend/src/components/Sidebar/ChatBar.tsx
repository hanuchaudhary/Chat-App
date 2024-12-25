import { Users, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import BottomInput from "./BottomInput";
import { Chat } from "./Chat";
import AddUsersToProject from "../AddUserToProjectDialog";
import { useEffect, useState } from "react";
import {
  initilizeSocket,
  recieveMessage,
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
      sendMessage("projectMessage", {
        sender: user._id,
        message: message,
      });
      setMessage("");
    }
  }

  useEffect(() => {
    initilizeSocket(project._id);

    recieveMessage("projectMessage", (data: any) => {
      setMessages(prevMessages => [...prevMessages, data]);
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
      className="h-full relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 w-96 rounded-r-3xl shadow-2xl overflow-hidden flex flex-col"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-4 px-6 bg-white bg-opacity-10 backdrop-blur-sm"
      >
        <h1 className="text-2xl font-bold capitalize text-white flex items-center">
          <MessageCircle className="mr-2" />
          {project.name}
        </h1>
      </motion.div>
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="p-4 flex justify-between items-center w-full">
          <AddUsersToProject />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="bg-white text-purple-900 font-semibold rounded-full p-3 shadow-lg hover:bg-purple-100 transition-colors duration-200"
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
