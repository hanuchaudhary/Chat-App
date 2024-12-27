import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectTileProps {
  projectId: string;
  name: string;
  collaborators: number;
}

export function ProjectTile({
  projectId,
  name,
  collaborators,
}: ProjectTileProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
    >
      <Link to={`/project/${projectId}`} className="block p-6">
        <h2 className="text-xl font-bold text-black dark:text-white mb-2 truncate">{name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-green-500">
            <Users size={18} className="mr-2" />
            <span>
              {collaborators} collaborator{collaborators !== 1 ? "s" : ""}
            </span>
          </div>
          <motion.div whileHover={{ x: 5 }} className="text-green-500">
            <ArrowRight size={24} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
