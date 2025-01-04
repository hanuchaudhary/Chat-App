import { motion } from "framer-motion";
import { useChatStore } from "../../store/Chatstore/useChatStore";
import { useAuthUser } from "../../store/UserStore/useAuthUser";
import { useEffect, useRef } from "react";

export function Chat() {
  const { messages } = useChatStore();
  const { user } = useAuthUser();
  const currentUserId = user.id;

  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className=" overflow-y-auto h-[580px] px-4 py-2">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`flex ${
            msg.senderId === currentUserId ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex flex-col">
            <p className="text-xs font-semibold mb-1">
              {msg.senderId === currentUserId ? "You" : msg.email}
            </p>
            <div
              className={`max-w-3/4 rounded-2xl px-4 py-2 ${
                msg.senderId === currentUserId
                  ? "bg-green-500 text-white"
                  : "bg-white bg-opacity-10 text-white"
              }`}
            >
              <p className="text-sm text-wrap">{msg.message}</p>
            </div>
          </div>
        </motion.div>
      ))}
      <div ref={chatRef} />
    </div>
  );
}
