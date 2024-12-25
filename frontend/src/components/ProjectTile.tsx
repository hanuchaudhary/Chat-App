import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectTileProps {
  projectId: string;
  name: string;
  collaboraters: number;
}

export function ProjectTile({ projectId, name, collaboraters }: ProjectTileProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/project/${projectId}`} className="block p-6">
        <h2 className="text-xl font-bold text-white mb-2 truncate">{name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-purple-200">
            <Users size={18} className="mr-2" />
            <span>{collaboraters} collaborator{collaboraters !== 1 ? 's' : ''}</span>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="text-white"
          >
            <ArrowRight size={24} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

