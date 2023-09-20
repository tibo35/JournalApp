import React from "react";
import ElementCard from "../Elements/ElementCard";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    taskCount: number;
  };
  deleteProject: (id: string) => Promise<void>;
  onOpen: (title: string, id: string) => void;
}

const ProjectCard: React.FC<ProjectProps> = ({
  project,
  deleteProject,
  onOpen,
}) => (
  <ElementCard
    title={project.title}
    id={project.id}
    onDelete={deleteProject}
    onOpen={onOpen}
    taskCount={project.taskCount}
  />
);

export default ProjectCard;
