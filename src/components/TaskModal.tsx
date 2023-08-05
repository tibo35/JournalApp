import React, { useState, useEffect } from "react";
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
import { close, trash } from "ionicons/icons";
import { fetchTasks, deleteTask, postTask } from "../Api/ApiTab2";

interface Task {
  id: string;
  content: string;
}

const TaskModal: React.FC<{ title: string; onClose: () => void }> = ({
  title,
  onClose,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(
          data.map((task: any) => ({
            id: task._id,
            content: task.content,
          }))
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const addTask = () => {
    if (taskInput.trim().length > 0) {
      postTask(taskInput)
        .then((data) => {
          setTasks((prevTasks) => [
            ...prevTasks,
            { id: data._id, content: data.content },
          ]);
          setTaskInput("");
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  };
  const onDelete = (id: string) => {
    console.log("Deleting task with id: ", id); // Add this line
    deleteTask(id)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks.id !== id));
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <IonPage className="modal-container">
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
              <IonLabel>{task.content}</IonLabel>
              <IonButton onClick={() => onDelete(task.id)}>
                <IonIcon icon={trash} color="danger" />
              </IonButton>
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
