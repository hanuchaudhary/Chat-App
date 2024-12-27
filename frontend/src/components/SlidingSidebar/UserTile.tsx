import { motion } from "framer-motion";
import { User } from "../../store/UserStore/useBulkUsersStore";

export default function UserTile({ email }: User) {
  return (
    <motion.div
      className="w-full flex items-center p-4 bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-12 w-12 rounded-full overflow-hidden shadow-lg mr-4 border-2 border-white">
        <motion.img
          className="object-cover w-full h-full"
          src="https://i.pinimg.com/736x/fd/82/61/fd8261b84d8528a287d8871c1a0fcc13.jpg"
          alt={`Avatar for ${email}`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold truncate">{email}</h2>
      </div>
      <motion.svg
        className="w-6 h-6 opacity-50"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        whileHover={{ scale: 1.2, opacity: 1 }}
      >
        <path d="M9 5l7 7-7 7"></path>
      </motion.svg>
    </motion.div>
  );
}
