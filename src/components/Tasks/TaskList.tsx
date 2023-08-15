import React from "react";
import { IonList, IonSpinner } from "@ionic/react";
import TaskItem from "./TaskItem";
import { Task } from "./taskTypes";
import "./TaskList.css";
interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  loading,
  error,
}) => (
  <>
    {loading && <IonSpinner />}
    {error && <p className="error-notification">{error}</p>}
    <IonList className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </IonList>
  </>
);

export default TaskList;
