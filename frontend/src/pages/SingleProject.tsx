import { useEffect, useState } from "react";
import ChatBar from "../components/Sidebar/ChatBar";
import SlidingSidebar from "../components/SlidingSidebar/SlidingSidebar";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useProjectsStore } from "../store/ProjectsStore/useProjectsStore";

export default function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarOpen = () => setIsOpen(!isOpen);
  const { fetchSingleProject, project } = useProjectsStore();

  const { projectId } = useParams();
  console.log("P: ",projectId);
  
  useEffect(() => {
    fetchSingleProject(projectId as string);
  }, [fetchSingleProject]);

  return (
    <div className="flex">
      <div className="m-2">
        <AnimatePresence>
          {isOpen && (
            <SlidingSidebar
              users={project.users}
              handleOpen={handleSidebarOpen}
            />
          )}
        </AnimatePresence>
        <ChatBar project={project} handleOpen={handleSidebarOpen} />
      </div>
    </div>
  );
}
