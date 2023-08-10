import React from "react";
import { IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import { Task } from "../taskTypes"; // Import Task from the new types file

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => (
  <IonItem key={task.id}>
    <IonLabel>{task.content}</IonLabel>
    <IonButton onClick={() => onDelete(task.id)}>
      <IonIcon icon={trash} color="danger" />
    </IonButton>
  </IonItem>
);

export default TaskItem;
