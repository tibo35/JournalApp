import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import "./styles/TaskHeader.css";
import TaskTitleContext from "./TaskTitleContext";
interface TaskHeaderProps {
  onClose: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onClose }) => {
  const title = React.useContext(TaskTitleContext);
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="start" className="close-button-container">
          <IonButton onClick={onClose}>
            <IonIcon icon={chevronBackOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
export default TaskHeader;
