import { FC } from "react";
import { Link } from "react-router-dom";

interface ProjectTileProps {
  name: string;
  collaboraters: number;
  projectId: string;
}

export const ProjectTile: FC<ProjectTileProps> = ({
  name,
  collaboraters,
  projectId,
}) => {
  return (
    <Link
      to={`/project/${projectId}`}
      className="bg-neutral-700 shadow-md rounded-xl p-2 flex justify-between items-center"
    >
      <h3 className="text-lg font-semibold capitalize text-white">{name}</h3>
      <div>
        <button
          className="bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-xl font-semibold"
          aria-label={`Open ${name} project`}
        >
          Open Project
        </button>
        <h2 className="font-semibold text-white text-center py-3">
          Collaboraters {collaboraters}
        </h2>
      </div>
    </Link>
  );
};
