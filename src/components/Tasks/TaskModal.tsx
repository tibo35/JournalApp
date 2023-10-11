import React, { useState, useEffect } from "react";
import {
  IonFooter,
  IonFabButton,
  IonFab,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";

import TaskHeader from "./TaskHeader";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
import "./styles/TaskModal.css";
import { Task } from "./taskTypes";

import { useDispatch } from "react-redux";
import {
  updateTaskAsync,
  createTaskAsync,
  deleteTaskAsync,
  fetchTasksAsync,
} from "../../slices/taskSlice";
import { AppDispatch } from "../../store";

const TaskModal: React.FC<{
  title: string;
  cardId: string;
  onClose: () => void;
}> = ({ title, cardId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [tasks, setTasks] = useState<Task[]>([]);
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
  const addTask = (
    title: string,
    description: string,
    date: string,
    categories: string[]
  ) => {
    dispatch(
      createTaskAsync({
        content: title,
        date: date,
        cardId: cardId,
        description: description,
        categories: categories,
      })
    ).then((responseAction) => {
      if (createTaskAsync.fulfilled.match(responseAction)) {
        const task = responseAction.payload;
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: task._id,
            content: task.content,
            date: task.date,
            description: task.description,
            categories: task.categories,
            cardId: cardId,
          },
        ]);
      } else {
        console.error("Failed to create task:", responseAction.error);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    if (cardId) {
      dispatch(fetchTasksAsync(cardId))
        .then((responseAction) => {
          if (fetchTasksAsync.fulfilled.match(responseAction)) {
            const fetchedTasks = responseAction.payload.tasks;
            setTasks(
              fetchedTasks.map((task: any) => ({
                id: task._id,
                content: task.content,
                date: task.date,
                description: task.description,
                categories: task.categories,
              }))
            );
          } else {
            console.error("Failed to fetch tasks:", responseAction.error);
            setError("Failed to fetch tasks!");
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError("Failed to fetch tasks!");
        })
        .finally(() => setLoading(false));
    }
  }, [cardId, dispatch]);

  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  const onDelete = (id: string) => {
    console.log("Deleting task with id: ", id);
    dispatch(deleteTaskAsync({ taskId: id, cardId }))
      .then((responseAction) => {
        if (deleteTaskAsync.fulfilled.match(responseAction)) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } else {
          console.error("Failed to delete task:", responseAction.error);
        }
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  };

  const onEdit = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      startEditing(task);
    }
  };
  const updateTaskHandler = (updatedTask: Task) => {
    dispatch(updateTaskAsync(updatedTask))
      .then((responseAction) => {
        if (updateTaskAsync.fulfilled.match(responseAction)) {
          const task = responseAction.payload;
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
          setEditingTask(null);
        } else {
          console.error("Failed to update task:", responseAction.error);
        }
      })
      .catch((error) => {
        console.error("Failed to update task:", error);
      });
  };

  return (
    <>
      <TaskHeader onClose={onClose} title={title} />

      <TaskList
        tasks={tasks}
        onDelete={onDelete}
        loading={loading}
        error={error}
        onEdit={onEdit}
        addTask={addTask}
        updateTask={updateTaskHandler}
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
          </IonFooter>
          <IonModal isOpen={showModal} onDidDismiss={handleModalDismiss}>
            <NewTask closeModal={handleModalDismiss} addTask={addTask} />
          </IonModal>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
