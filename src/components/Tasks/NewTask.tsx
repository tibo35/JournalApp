import React, { useState, useRef } from "react";
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
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  const handleAddTaskClick = () => {
    const currentDescription = textareaRef.current?.value || "";
    console.log("Task Description before adding task:", currentDescription);
    console.log("NewTaskTitle: " + taskTitle);
    console.log("NewTask Description: " + currentDescription);
    addTask(taskTitle, currentDescription);
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
            ref={textareaRef}
            onIonChange={(e) => {
              console.log("Textarea value:", e.detail.value);
            }}
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
