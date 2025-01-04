import { useEffect, useState } from "react";
import ChatBar from "../components/Sidebar/ChatBar";
import SlidingSidebar from "../components/SlidingSidebar/SlidingSidebar";
import { AnimatePresence } from "framer-motion";
import { useProjectsStore } from "../store/ProjectsStore/useProjectsStore";
import { useChatStore } from "../store/Chatstore/useChatStore";

export default function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarOpen = () => setIsOpen(!isOpen);
  const { fetchSingleProject, selectedProjectId } = useProjectsStore();
  const { connectSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    if (selectedProjectId === "") {
      return;
    }
    connectSocket();
    fetchSingleProject();
    return () => {
      disconnectSocket();
    };
  }, [fetchSingleProject]);

  return (
    <div className="flex">
      <div className="m-2">
        <AnimatePresence>
          {isOpen && (
            <SlidingSidebar
              handleOpen={handleSidebarOpen}
            />
          )}
        </AnimatePresence>
        <ChatBar handleOpen={handleSidebarOpen} />
      </div>
    </div>
  );
}
