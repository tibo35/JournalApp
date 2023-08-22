import React, { useState, useEffect, useRef } from "react";
import { IonButton, IonInput, IonTextarea } from "@ionic/react";
import "./styles/NewTask.css";
import { Task } from "./taskTypes";

interface NewTaskProps {
  closeModal: () => void;
  addTask: (title: string, description: string) => void;
  task?: Task; // accept task as optional prop
  updateTask?: (updatedTask: Task) => void;
}

const NewTask: React.FC<NewTaskProps> = ({
  closeModal,
  addTask,
  task,
  updateTask,
}) => {
  const [title, setTitle] = useState(task ? task.content : "");
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  useEffect(() => {
    if (task && task.description && textareaRef.current) {
      textareaRef.current.value = task.description;
    }
  }, [task]);

  const handleSave = () => {
    const description = textareaRef.current?.value || "";

    if (task && updateTask) {
      console.log(task);
      updateTask({ ...task, content: title, description: description });
    } else {
      addTask(title, description);
    }
    closeModal();
  };

  return (
    <>
      <IonInput
        placeholder="Title"
        value={title}
        onIonChange={(e) => setTitle(e.detail.value!)}
      />
      <IonTextarea placeholder="Description" ref={textareaRef} />
      <IonButton onClick={handleSave}>
        {task ? "Update Task" : "Add Task"}
      </IonButton>
    </>
  );
};

export default NewTask;
