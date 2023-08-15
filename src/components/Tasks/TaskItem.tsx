import React from "react";
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { Task } from "../Tasks/taskTypes";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => (
  <IonItemSliding>
    <IonItem className="task-content">{task.content}</IonItem>

    <IonItemOptions side="end">
      <IonItemOption color="danger" onClick={() => onDelete(task.id)}>
        <IonIcon slot="icon-only" icon={trash} />
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
);

export default TaskItem;
