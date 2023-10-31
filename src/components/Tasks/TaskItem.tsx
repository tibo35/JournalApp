import React, { useState } from "react";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonIcon,
  IonInput,
  IonFooter,
  IonModal,
  IonCheckbox,
  IonLabel,
} from "@ionic/react";
import NewTask from "./NewTask";
import { trash, create, heart, checkboxOutline } from "ionicons/icons";
import { Task } from "../Tasks/taskTypes";
import "./styles/TaskItem.css";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
  onEdit: (id: string) => void;
  addTask: (
    title: string,
    description: string,
    date: string,
    categories: string[],
    status: string
  ) => void;

  updateTask: (updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  updateTask,
  addTask,
  onDone,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);
  const [showModal, setShowModal] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (editedContent !== task.content) {
      updateTask({ ...task, content: editedContent });
    }
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLIonInputElement>
  ) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };
  const handleeditButtonClick = () => {
    setShowModal(true);
  };

  const handleModalDismiss = () => {
    setShowModal(false);
  };
  return (
    <IonItemSliding>
      {isEditing ? (
        <IonInput
          value={editedContent}
          onIonChange={(e) => handleInputChange(e as any)}
          onIonBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autofocus
        />
      ) : (
        <IonItem
          className={`task-content ${
            task.status === "done" ? "done-task" : ""
          }`}>
          <IonCheckbox
            className={task.status === "done" ? "done-checkbox" : ""}
            slot="start"
            checked={task.status === "done"}
            onIonChange={() => onDone(task.id)}
            aria-label={task.content}
          />

          <IonLabel>{task.content}</IonLabel>
        </IonItem>
      )}

      <IonFooter>
        <IonModal isOpen={showModal} onDidDismiss={handleModalDismiss}>
          <NewTask
            closeModal={handleModalDismiss}
            addTask={addTask}
            task={task}
            updateTask={updateTask}
          />
        </IonModal>
      </IonFooter>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(task.id)}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
        <IonItemOption onClick={handleeditButtonClick}>
          <IonIcon
            slot="end"
            icon={create}
            style={{ marginRight: "10px", cursor: "pointer" }}
          />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TaskItem;
