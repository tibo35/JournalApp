import React, { useState, useEffect } from "react";
import { IonDatetime } from "@ionic/react";
import { format } from "date-fns";
import { fetchTasks, deleteTask, postTask } from "../../Api/ApiTab2";
import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import TaskFooter from "./TaskFooter";

interface Task {
  id: string;
  content: string;
  date: string;
}

const TaskModal: React.FC<{
  title: string;
  cardId: string;

  onClose: () => void;
}> = ({ title, cardId, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    if (cardId) {
      fetchTasks(cardId)
        .then((data) => {
          setTasks(
            data.map((task: any) => ({
              id: task._id,
              content: task.content,
            }))
          );
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError("Failed to fetch tasks!");
        })
        .finally(() => setLoading(false));
    }
  }, [cardId]);

  const addTask = () => {
    if (taskInput.trim().length > 0) {
      postTask(taskInput, dueDate, cardId)
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

  const onDelete = (id: string) => {
    console.log("Deleting task with id: ", id);
    deleteTask(id)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((tasks) => tasks.id !== id));
      })
      .catch((error) => console.error("Fetch error:", error));
  };
  return (
    <>
      <TaskHeader onClose={onClose} />
      <TaskList
        tasks={tasks}
        onDelete={onDelete}
        loading={loading}
        error={error}
      />
      <TaskFooter
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        addTask={addTask}
      />
      {showDatePicker && (
        <div className="date-picker-wrapper">
          <IonDatetime
            class="date-picker-modal"
            placeholder="Select Date"
            value={Array.isArray(dueDate) ? dueDate[0] : dueDate || undefined}
            onIonChange={(e) => {
              const newDate = e.detail.value as string;
              const formattedDate = format(new Date(newDate), "dd/MM/yyyy");
              setDueDate(formattedDate);
              setShowDatePicker(false);
            }}
          />
        </div>
      )}
    </>
  );
};

export default TaskModal;
