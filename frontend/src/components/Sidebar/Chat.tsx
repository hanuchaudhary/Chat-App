import { motion } from "framer-motion";

interface Message {
  sender: string;
  message: string;
}

interface ChatProps {
  messages: Message[];
  currentUser: { _id: string };
}

export function Chat({ messages, currentUser }: ChatProps) {
  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`flex ${
            msg.sender === currentUser._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-3/4 rounded-2xl px-4 py-2 ${
              msg.sender === currentUser._id
                ? "bg-purple-500 text-white"
                : "bg-white bg-opacity-10 text-white"
            }`}
          >
            <p className="text-sm">{msg.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
