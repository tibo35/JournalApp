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
  IonDatetime,
  IonFooter,
} from "@ionic/react";
import { format } from "date-fns";
import { close, trash } from "ionicons/icons";
import { fetchTasks, deleteTask, postTask } from "../Api/ApiTab2";
import "./TaskModal.css";

interface Task {
  id: string;
  content: string;
  date: string;
}

const TaskModal: React.FC<{ title: string; onClose: () => void }> = ({
  title,
  onClose,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

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
      postTask(taskInput, dueDate)
        .then((data) => {
          setTasks((prevTasks) => [
            ...prevTasks,
            { id: data._id, content: data.content, date: data.date },
          ]);
          setTaskInput("");
          setDueDate("");
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  };

  const markTouched = () => {
    setIsTouched(true);
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
    <>
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
        </IonList>
      </IonContent>

      <IonFooter>
        <IonInput
          className="task-input"
          value={taskInput}
          placeholder="Enter a task"
          type="text"
          onInput={(e) => setTaskInput((e.target as HTMLInputElement).value)}
        />
        <div className="container-items">
          <IonInput
            className="date-input"
            value={dueDate || ""}
            placeholder="Due Date"
            readonly
            onIonBlur={() => markTouched()}
            onFocus={() => setShowDatePicker(true)}
          />

          {showDatePicker && (
            <IonDatetime
              class="date-picker-modal"
              placeholder="Select Date"
              value={Array.isArray(dueDate) ? dueDate[0] : dueDate || undefined} // If dueDate is array, pass first element. If it's empty, pass undefined.
              onIonChange={(e) => {
                const newDate = e.detail.value as string;
                const formattedDate = format(new Date(newDate), "dd/MM/yyyy");
                setDueDate(formattedDate);
                setShowDatePicker(false);
              }}
            />
          )}
        </div>

        <IonButton className="button-center" onClick={addTask}>
          Add Item
        </IonButton>
      </IonFooter>
    </>
  );
};

export default TaskModal;
