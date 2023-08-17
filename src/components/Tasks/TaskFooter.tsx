import React, { useState } from "react";
import {
  IonFooter,
  IonFab,
  IonFabButton,
  IonModal,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import NewTask from "./NewTask"; // Import the NewTask component
import "./styles/TaskFooter.css";

interface TaskFooterProps {
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  addTask: (title: string, description: string) => void;
}

const TaskFooter: React.FC<TaskFooterProps> = ({
  showDatePicker,
  setShowDatePicker,
  addTask,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleModalDismiss = () => {
    setShowModal(false);
  };

  return (
    <IonFooter>
      <div className="container-items">
        <IonFab
          className="add-button"
          vertical="bottom"
          horizontal="end"
          slot="fixed">
          <IonFabButton onClick={handleAddButtonClick}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </div>

      {/* NewTask Modal */}
      <IonModal isOpen={showModal} onDidDismiss={handleModalDismiss}>
        <NewTask closeModal={handleModalDismiss} addTask={addTask} />
      </IonModal>
    </IonFooter>
  );
};

export default TaskFooter;
