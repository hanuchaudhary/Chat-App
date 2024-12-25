import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus2Icon, X, ZoomIn, Loader2 } from 'lucide-react';
import { useBulkUsersStore } from "../store/UserStore/useBulkUsersStore";
import { useSetCollaboratorsToProjectStore } from "../store/UserStore/useSetCollaboratorsToProjectStore";
import { useParams } from "react-router-dom";

export default function AddUsersToProject() {
  const { fetchUsers, users } = useBulkUsersStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { projectId } = useParams();
  const { addUserLoading, setCollaboratorsToProject } = useSetCollaboratorsToProjectStore();

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

  const addUsersToProject = () => {
    setCollaboratorsToProject(selectedUsers, projectId as string);
    setIsOpen(false);
    setSelectedUsers([]);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-full px-6 py-3 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <UserPlus2Icon className="w-5 h-5" />
        <span>Add Collaborators</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select Users</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <ZoomIn className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="max-h-60 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {users.map((user) => (
                      <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedUsers.includes(user._id)
                            ? "bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.email}
                          </div>
                        </div>
                        {selectedUsers.includes(user._id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
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
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 dark:text-gray-300 font-medium px-4 py-2 rounded-full mr-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addUsersToProject}
                  disabled={selectedUsers.length === 0 || addUserLoading}
                  className={`bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-full px-6 py-2 flex items-center justify-center ${
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
        )}
      </AnimatePresence>
    </>
  );
}

