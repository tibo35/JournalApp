import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonIcon,
  IonReorder,
  IonModal,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import TaskModal from "../Tasks/TaskModal"; // Ensure this path is correct

interface ProjectProps {
  project: {
    id: string;
    title: string;
  };
  deleteProject: (id: string) => Promise<void>;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, deleteProject }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteProject(project.id);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IonCard>
        <IonItemSliding>
          <IonItem onClick={openModal}>
            <IonCardHeader>
              <IonReorder />
              <IonCardTitle>{project.title}</IonCardTitle>
            </IonCardHeader>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={handleDelete}>
              <IonIcon slot="icon-only" icon={trash} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      </IonCard>
    </>
  );
};

export default ProjectCard;
