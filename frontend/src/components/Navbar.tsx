import { Link, useLocation} from "react-router-dom";
import AddUsersToProject from "./AddUserToProjectDialog";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useProjectsStore } from "../store/ProjectsStore/useProjectsStore";

export default function Navbar() {
  const { project } = useProjectsStore();
  const { pathname } = useLocation();

  return (
    <div className="p-2">
      <div className="bg-white dark:bg-neutral-900 dark:text-white flex items-center justify-between rounded-2xl px-4 py-4 shadow-md">
        <div>
          <h1 className="text-2xl font-semibold capitalize">
            {pathname.startsWith("/project")
              ? `Project | ${project.name || "Project Name"}`
              : "Dashboard"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {pathname.startsWith("/project") && <AddUsersToProject />}
          {pathname.startsWith("/project") && (
            <Link to={"/dashboard"} replace>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 dark:bg-neutral-100 dark:text-black bg-neutral-800 text-white font-semibold rounded-xl px-2 py-2"
              >
                <ArrowLeft /> Back
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
