import React, { useState } from "react";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonIcon,
  IonInput,
} from "@ionic/react";
import { trash, create } from "ionicons/icons";
import { Task } from "../Tasks/taskTypes";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
  updateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

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
        <IonItem className="task-content">{task.content}</IonItem>
      )}

      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={() => setIsEditing(true)}>
          <IonIcon slot="icon-only" icon={create} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => onDelete(task.id)}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default TaskItem;
