import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
} from "@ionic/react";
import { close } from "ionicons/icons";

interface Task {
  id: number;
  name: string;
}

const TaskModal: React.FC<{ title: string; onClose: () => void }> = ({
  title,
  onClose,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim().length > 0) {
      // Check if input is not just white spaces
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, name: taskInput },
      ]);
      setTaskInput(""); // Reset the task input field
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonLabel>{task.name}</IonLabel>
            </IonItem>
          ))}
          <IonInput
            value={taskInput}
            placeholder="Enter Task"
            onInput={(e) => setTaskInput((e.target as HTMLInputElement).value)}
          />
          <IonButton onClick={addTask}>Add Task</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TaskModal;
