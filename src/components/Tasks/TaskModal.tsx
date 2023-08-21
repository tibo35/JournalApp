import React, { useState, useEffect } from "react";
import { IonDatetime } from "@ionic/react";
import { format } from "date-fns";
import { postTask, fetchTasks, deleteTask } from "../../Api/ApiTab2";
import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import TaskFooter from "./TaskFooter";
import "./styles/TaskModal.css";

interface Task {
  id: string;
  content: string;
  date: string;
  description: string;
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
  const [editingTask, setEditingTask] = useState<null | Task>(null);

  const addTask = (title: string, description: string) => {
    // Perform API call to add the task
    console.log(description);
    postTask(title, dueDate, cardId, description) // Pass all required parameters
      .then((data) => {
        // Update the tasks state with the new task
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: data._id,
            content: data.content,
            date: data.date,
            description: data.description,
          },
        ]);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  useEffect(() => {
    setLoading(true);
    if (cardId) {
      fetchTasks(cardId)
        .then((data) => {
          setTasks(
            data.map((task: any) => ({
              id: task._id,
              content: task.content,
              date: task.date,
              description: task.description,
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

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const onDelete = (id: string) => {
    console.log("Deleting task with id: ", id);
    deleteTask(id)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const onEdit = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      startEditing(task);
    }
  };
  const updateTask = (updatedTask: Task) => {
    // send a request to the back end to update the task in the database
    fetch(`/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Task updated successfully") {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
          setEditingTask(null);
        }
      });
  };

  return (
    <>
      <TaskHeader onClose={onClose} />

      <TaskList
        tasks={tasks}
        onDelete={onDelete}
        loading={loading}
        error={error}
        onEdit={onEdit}
        updateTask={updateTask}
      />

      <div className="task-modal-content">
        <div className="task-footer">
          <TaskFooter
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            addTask={addTask}
          />
          {showDatePicker && (
            <div className="date-picker-wrapper">
              <IonDatetime
                className="date-picker-modal"
                placeholder="Select Date"
                value={dueDate || undefined}
                onIonChange={(e) => {
                  const newDate = e.detail.value as string;
                  const formattedDate = format(new Date(newDate), "dd/MM/yyyy");
                  setDueDate(formattedDate);
                  setShowDatePicker(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskModal;
