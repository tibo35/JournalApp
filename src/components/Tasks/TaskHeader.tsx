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
interface TaskHeaderProps {
  onClose: () => void;
  title: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onClose, title }) => {
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
