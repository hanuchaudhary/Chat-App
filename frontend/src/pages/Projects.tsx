import { useEffect, useState } from "react";
import { ProjectTile } from "../components/ProjectTile";
import { useProjectsStore } from "../store/ProjectsStore/useProjectsStore";
import { Loader2 } from "lucide-react";
import { CreateProjectDialog } from "../components/CreateProjectDialog";

export default function Projects() {
  const { fetchProjects, isLoading, projects } = useProjectsStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <div className="h-screen bg-neutral-900 p-4">
      <div className="">
        <button
          onClick={handleOpenDialog}
          className="text-2xl inline-block bg-white rounded-xl px-4 py-2 font-semibold mb-4"
        >
          Create New Project
        </button>
        {isDialogOpen && (
          <CreateProjectDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
          />
        )}
      </div>
      <div className="py-6 w-96">
        <h1 className="text-white font-semibold  py-2">Projects</h1>
        <div>
          {isLoading ? (
            <div>
              <Loader2 className="animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-white">No projects found</div>
          ) : (
            <div className="flex flex-col gap-2">
              {projects.map((project) => (
                <ProjectTile
                  projectId={project._id}
                  key={project._id}
                  name={project.name}
                  collaboraters={project.users.length}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
