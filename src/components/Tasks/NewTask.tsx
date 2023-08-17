import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonTextarea,
  IonFooter,
} from "@ionic/react";
import "./styles/NewTask.css";

interface NewTaskProps {
  closeModal: () => void;
  addTask: (title: string, description: string) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ closeModal, addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTaskClick = () => {
    addTask(taskTitle, taskDescription);
    closeModal();
  };

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add New Task</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          placeholder="Task Title"
          value={taskTitle}
          onIonChange={(e) => setTaskTitle(e.detail.value!)}
        />
        <div className="description-container">
          <IonTextarea
            className="description-item"
            placeholder="Task Description"
            value={taskDescription}
            onIonChange={(e) => setTaskDescription(e.detail.value!)}
          />
        </div>
        <div className="btn-container">
          <IonButton
            expand="block"
            className="add-task-button"
            onClick={handleAddTaskClick}>
            Add Task
          </IonButton>
          <IonButton
            expand="block"
            className="cancel-button"
            color="danger"
            onClick={closeModal}>
            Cancel
          </IonButton>
        </div>
      </IonContent>
    </IonContent>
  );
};

export default NewTask;
