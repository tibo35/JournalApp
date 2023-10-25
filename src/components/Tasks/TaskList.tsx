import React from "react";
import { IonList } from "@ionic/react";
import TaskItem from "./TaskItem";
import { Task } from "./taskTypes";
import "./styles/TaskList.css";
interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onDone: (id: string) => void;
  onEdit: (id: string) => void;
  loading: boolean;
  error: string | null;
  updateTask: (updatedTask: Task) => void;
  addTask: (
    title: string,
    description: string,
    date: string,
    categories: string[],
    status: string
  ) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  updateTask,
  onEdit,
  error,
  addTask,
  onDone,
}) => (
  <>
    {error && <p className="error-notification">{error}</p>}
    <IonList className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          addTask={addTask}
          onDelete={onDelete}
          onEdit={onEdit}
          updateTask={updateTask}
          onDone={onDone}
        />
      ))}
    </IonList>
  </>
);

export default TaskList;
