import React, { useState, useEffect } from "react";
import {
  IonDatetime,
  IonFooter,
  IonFabButton,
  IonFab,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { format } from "date-fns";
import { add } from "ionicons/icons";

import { postTask, fetchTasks, deleteTask } from "../../Api/ApiTab2";
import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
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
  const [dueDate, setDueDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<null | Task>(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleModalDismiss = () => {
    setShowModal(false);
  };
  const addTask = (title: string, description: string) => {
    console.log(description);
    postTask(title, dueDate, cardId, description)
      .then((data) => {
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
    if (!updatedTask.id) {
      console.error("updatedTask does not have an 'id' property");
      return;
    }

    fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            "Failed to update task. Response status:",
            response.status
          );
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.message === "Task updated successfully") {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
          setEditingTask(null);
        }
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
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
        addTask={addTask}
        updateTask={updateTask}
      />
      <div className="task-modal-content">
        <div className="task-footer">
          <IonFooter>
            <div className="container-items">
              <IonFab
                className="add-button"
                vertical="bottom"
                horizontal="center"
                slot="fixed">
                <IonFabButton onClick={handleAddButtonClick}>
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </div>

            <IonModal isOpen={showModal} onDidDismiss={handleModalDismiss}>
              <NewTask closeModal={handleModalDismiss} addTask={addTask} />
            </IonModal>
          </IonFooter>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
