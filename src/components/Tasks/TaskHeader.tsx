import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
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
        <IonButtons slot="end" className="close-button-container">
          <IonButton onClick={onClose}>
            <IonIcon icon={closeCircle} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
export default TaskHeader;
