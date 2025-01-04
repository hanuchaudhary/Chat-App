import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useChatStore } from "../../store/Chatstore/useChatStore";
import { useProjectsStore } from "../../store/ProjectsStore/useProjectsStore";

export default function BottomInput() {
  const [isFocused, setIsFocused] = useState(false);

  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { sendMessage } = useChatStore();
  const projectId = useProjectsStore.getState().selectedProjectId;
  const messageData = {
    message: text,
    senderId: user._id,
    projectId,
    email : user.email
  };

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    if (messageData.message) {
      sendMessage(messageData);
      setText("");
    }
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-0 left-0 w-full p-4 bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg"
    >
      <form className="flex items-center justify-between bg-white dark:bg-neutral-600 rounded-full p-2">
        <motion.input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Type your message..."
          className="flex-grow bg-transparent text-black px-4 py-2 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <motion.button
          type="submit"
          onClick={handleSendMessage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white rounded-full p-2 shadow-md hover:bg-green-600 transition-colors duration-200"
        >
          <Send size={20} />
        </motion.button>
      </form>
    </motion.div>
  );
}
