import React, { useEffect, useRef } from "react";
import { IonButton, IonInput, IonTextarea } from "@ionic/react";
import "./styles/NewTask.css";
import { Task } from "./taskTypes";
import TaskHeader from "./TaskHeader";

interface NewTaskProps {
  closeModal: () => void;
  addTask: (title: string, description: string) => void;
  task?: Task;
  updateTask?: (updatedTask: Task) => void;
}

const NewTask: React.FC<NewTaskProps> = ({
  closeModal,
  addTask,
  task,
  updateTask,
}) => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const descriptionRef = useRef<HTMLIonTextareaElement>(null);

  useEffect(() => {
    if (task) {
      titleRef.current!.value = task.content;
      descriptionRef.current!.value = task.description;
    }
  }, [task]);

  const handleSave = () => {
    const currentTitle =
      typeof titleRef.current?.value === "string" ? titleRef.current.value : ""; // Check type before assignment
    const currentDescription =
      typeof descriptionRef.current?.value === "string"
        ? descriptionRef.current.value
        : "";

    if (task && updateTask) {
      updateTask({
        ...task,
        content: currentTitle,
        description: currentDescription,
      });
    } else {
      addTask(currentTitle, currentDescription);
    }
    closeModal();
  };

  return (
    <>
      <TaskHeader onClose={closeModal} />
      <div className="task-container">
        <IonInput placeholder="Title" ref={titleRef} />
        <IonTextarea placeholder="Description" ref={descriptionRef} />
        <IonButton onClick={handleSave}>
          {task ? "Update Task" : "Add Task"}
        </IonButton>
      </div>
    </>
  );
};

export default NewTask;
