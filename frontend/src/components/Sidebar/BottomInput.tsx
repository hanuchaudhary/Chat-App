import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface InputProps {
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onclick: () => void;
  value: string;
}

export default function BottomInput({ onchange, value, onclick }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-0 left-0 w-full p-4 bg-neutral-300 dark:bg-neutral-800 rounded-2xl shadow-lg"
    >
      <div className="flex items-center justify-between bg-white dark:bg-neutral-600 rounded-full p-2">
        <motion.input
          onChange={onchange}
          value={value}
          type="text"
          placeholder="Type your message..."
          className="flex-grow bg-transparent text-black px-4 py-2 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <motion.button
          onClick={onclick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-500 text-white rounded-full p-2 shadow-md hover:bg-green-600 transition-colors duration-200"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
}

