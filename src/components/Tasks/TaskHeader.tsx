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

interface TaskHeaderProps {
  onClose: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onClose }) => (
  <IonHeader>
    <IonToolbar>
      <IonTitle>Tasks</IonTitle>
      <IonButtons slot="end">
        <IonButton onClick={onClose}>
          <IonIcon icon={closeCircle} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);

export default TaskHeader;
