import React, { useState, useEffect } from "react";
import { IonReorderGroup, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import ProjectCard from "../../components/Projects/ProjectCard";
import AddProject from "../../components/Projects/AddProject";
import { fetchProjects, postProject, deleteProject } from "../../Api/Api";

interface ProjectsViewProps {
  openModal: (title: string, id: string) => void;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ openModal }) => {
  const [projects, setProjects] = useState<{ id: string; title: string }[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(
        data.map((project: any) => ({
          id: project._id,
          title: project.title,
        }))
      );
    });
  }, []);

  const addProjectToState = (title: string) => {
    postProject(title).then((data) => {
      setProjects((prevProjects) => [
        ...prevProjects,
        { id: data._id, title: data.title },
      ]);
    });
  };

  const deleteProjectFromState = (id: string) => {
    return deleteProject(id).then(() => {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    });
  };
  const reorderProjects = (from: number, to: number) => {
    const reorderedProjects = [...projects];
    const [movedProject] = reorderedProjects.splice(from, 1);
    reorderedProjects.splice(to, 0, movedProject);
    setProjects(reorderedProjects);
  };

  const handleReorder = (event: CustomEvent) => {
    const from = event.detail.from;
    const to = event.detail.to;
    reorderProjects(from, to);
    event.detail.complete();
  };

  return (
    <>
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            deleteProject={deleteProjectFromState}
            onOpen={() => openModal(project.title, project.id)}
          />
        ))}
      </IonReorderGroup>

      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => setShowAlert(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <AddProject
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        addProject={addProjectToState}
      />
    </>
  );
};

export default ProjectsView;
