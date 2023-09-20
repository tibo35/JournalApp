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
} from "@ionic/react";
import "../Topics/TopicCard.css";

import { trash } from "ionicons/icons";

interface ProjectProps {
  project: {
    id: string;
    title: string;
  };
  deleteProject: (id: string) => Promise<void>;
  onOpen: (title: string, id: string) => void;
}

const ProjectCard: React.FC<ProjectProps> = ({
  project,
  deleteProject,
  onOpen,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteProject(project.id);
  };

  return (
    <>
      <IonCard>
        <IonItemSliding>
          <IonItem onClick={() => onOpen(project.title, project.id)}>
            <IonReorder />
            <IonCardHeader className="card-header">
              <IonCardTitle className="reorder-btn">
                {project.title}
              </IonCardTitle>
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
