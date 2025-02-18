import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus2Icon, X, ZoomIn, Loader2 } from "lucide-react";
import { useBulkUsersStore } from "../store/UserStore/useBulkUsersStore";
import { useSetCollaboratorsToProjectStore } from "../store/UserStore/useSetCollaboratorsToProjectStore";
import { useLocation } from "react-router-dom";

export default function AddUsersToProject() {
  const { fetchUsers, users } = useBulkUsersStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const projectId = useLocation().pathname.split("/")[2];
  const { addUserLoading, setCollaboratorsToProject } =
    useSetCollaboratorsToProjectStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filteredUsers = users.filter((user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    useBulkUsersStore.setState({ users: filteredUsers });
  }, [searchTerm]);  

  const toggleUserSelection = (_id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
    );
  };

  const addUsersToProject = (e: FormEvent) => {
    e.preventDefault();
    setCollaboratorsToProject(selectedUsers, projectId as string);
    setIsOpen(false);
    setSelectedUsers([]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        isOpen && setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isOpen]);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <UserPlus2Icon className="w-5 h-5" />
        <span>Add Collaborators</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <form onSubmit={addUsersToProject}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
                      Select Users
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full p-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ZoomIn className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                  </div>
                  <div className="max-h-60 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence>
                      {users.map((user) => (
                        <motion.div
                          key={user._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedUsers.includes(user._id)
                              ? "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
                              : "hover:bg-neutral-100 dark:hover:bg-neutral-700"
                          }`}
                          onClick={() => toggleUserSelection(user._id)}
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden shadow-lg mr-3">
                            <img
                              className="object-cover w-full h-full"
                              src="https://i.pinimg.com/736x/fd/82/61/fd8261b84d8528a287d8871c1a0fcc13.jpg"
                              alt={`Avatar of ${user.email}`}
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="text-sm font-medium text-neutral-900 dark:text-white">
                              {user.email}
                            </div>
                          </div>
                          {selectedUsers.includes(user._id) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700 px-6 py-4 flex justify-end items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-600 dark:text-neutral-300 font-medium px-4 py-2 rounded-full mr-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addUsersToProject}
                    disabled={selectedUsers.length === 0 || addUserLoading}
                    type="submit"
                    className={`bg-green-500 text-white font-semibold rounded-full px-6 py-2 flex items-center justify-center ${
                      selectedUsers.length === 0 || addUserLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg transition-all duration-300"
                    }`}
                  >
                    {addUserLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    <span>
                      {addUserLoading
                        ? "Adding Users..."
                        : `Add Users (${selectedUsers.length})`}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </form>
        )}
      </AnimatePresence>
    </>
  );
}
