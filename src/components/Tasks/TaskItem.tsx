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
} from "@ionic/react";
import NewTask from "./NewTask";
import { trash, create } from "ionicons/icons";
import { Task } from "../Tasks/taskTypes";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  addTask: (title: string, description: string) => void;

  updateTask: (updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
  updateTask,
  addTask,
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
    console.log("Task:", task);
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
        <IonItem className="task-content" onClick={handleeditButtonClick}>
          {task.content}
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
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TaskItem;
