import { Link, useLocation, useParams } from "react-router-dom";
import { useSingleProjectStore } from "../store/ProjectsStore/useSingleProjectStore";
import { useEffect } from "react";
import AddUsersToProject from "./AddUserToProjectDialog";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const { fetchSingleProject, project } = useSingleProjectStore();
  const { pathname } = useLocation();
  const { projectId } = useParams();
  useEffect(() => {
    fetchSingleProject(projectId as string);
  }, [fetchSingleProject]);

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
              <div className="flex items-center gap-2 dark:bg-neutral-100 dark:text-black bg-neutral-800 text-white font-semibold rounded-xl px-2 py-2">
                <ArrowLeft /> Back
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
