import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonInput,
  IonTextarea,
} from "@ionic/react";

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
        <IonTextarea
          placeholder="Task Description"
          value={taskDescription}
          onIonChange={(e) => setTaskDescription(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleAddTaskClick}>
          Add Task
        </IonButton>
        <IonButton expand="block" color="danger" onClick={closeModal}>
          Cancel
        </IonButton>
      </IonContent>
    </IonContent>
  );
};

export default NewTask;
