import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectTile } from "../components/ProjectTile";
import { useProjectsStore } from "../store/ProjectsStore/useProjectsStore";
import { Loader2, Plus, FolderOpen } from "lucide-react";
import { CreateProjectDialog } from "../components/CreateProjectDialog";

export default function Projects() {
  const { fetchProjects, isLoading, projects } = useProjectsStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-neutral-100 dark:bg-neutral-900 mx-20 rounded-xl p-6 md:p-8 lg:p-12"
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenDialog}
          className="text-lg md:text-xl inline-flex items-center bg-green-500 rounded-full px-6 py-3 font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="mr-2" size={24} />
          Create New Project
        </motion.button>
        <AnimatePresence>
          {isDialogOpen && (
            <CreateProjectDialog
              isOpen={isDialogOpen}
              onClose={handleCloseDialog}
            />
          )}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="dark:text-white text-black font-bold text-3xl md:text-4xl mb-6 flex items-center">
          <FolderOpen className="mr-3" size={32} />
          Projects
        </h1>
        <div>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Loader2 className="animate-spin text-purple-500" size={48} />
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-center py-12 bg-neutral-800 rounded-lg shadow-inner"
            >
              <p className="text-xl font-semibold mb-2">No projects found</p>
              <p className="text-gray-400">
                Create a new project to get started!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                >
                  <ProjectTile
                    collaborators={project.users.length}
                    projectId={project._id}
                    name={project.name}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
