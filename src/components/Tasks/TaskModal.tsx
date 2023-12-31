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
  updateTaskThunk,
  createTaskThunk,
  deleteTaskThunk,
  allTasksByCardThunk,
  allCategoryByCardThunk,
  allCategorythunk,
  allTasksThunk,
  tasksDueTodayThunk,
  tasksDoneTodayThunk,
  tasksDoneWeeklyThunk,
} from "../Redux/thunks/tasksThunk";
import { AppDispatch } from "../../store";

const TaskContainer: React.FC<{
  title: string;
  cardId: string;
  onClose: () => void;
}> = ({ title, cardId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
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
    categories: string[],
    status: string
  ) => {
    dispatch(
      createTaskThunk({
        content: title,
        date: date,
        cardId: cardId,
        description: description,
        categories: categories,
        status: "pending",
      })
    ).then((responseAction) => {
      if (createTaskThunk.fulfilled.match(responseAction)) {
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
            status: task.status,
          },
        ]);
        dispatch(allCategoryByCardThunk(cardId));
        dispatch(allCategorythunk());
        dispatch(allTasksThunk());
        dispatch(allTasksByCardThunk(cardId));
        dispatch(tasksDueTodayThunk());
        dispatch(tasksDoneTodayThunk());
        dispatch(tasksDoneWeeklyThunk());
      } else {
        console.error("Failed to create task:", responseAction.error);
      }
    });
  };

  useEffect(() => {
    if (cardId) {
      dispatch(allTasksByCardThunk(cardId))
        .then((responseAction) => {
          if (allTasksByCardThunk.fulfilled.match(responseAction)) {
            const fetchedTasks = responseAction.payload.tasks;
            setTasks(
              fetchedTasks.map((task: any) => ({
                id: task._id,
                content: task.content,
                date: task.date,
                description: task.description,
                categories: task.categories,
                status: task.status,
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
        });
    }
  }, [cardId, dispatch]);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTaskThunk({ taskId: id, cardId }))
      .then((responseAction) => {
        if (deleteTaskThunk.fulfilled.match(responseAction)) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
          updateCategoryCount();
        } else {
          console.error("Failed to delete task:", responseAction.error);
        }
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  };

  const updateCategoryCount = () => {
    dispatch(allCategoryByCardThunk(cardId));
    dispatch(allCategorythunk());
    dispatch(allTasksThunk());
    dispatch(allTasksByCardThunk(cardId));
    dispatch(tasksDueTodayThunk());
    dispatch(tasksDoneTodayThunk());
    dispatch(tasksDoneWeeklyThunk());
  };

  const onDelete = (id: string) => {
    console.log("Deleting task with id: ", id);
    handleDeleteTask(id);
  };

  const onEdit = (id: string) => {
    const task = tasks.find((task) => task.id === id);
  };

  const onDone = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedStatus = task.status === "done" ? "pending" : "done";
      updateTaskHandler({ ...task, status: updatedStatus });
      dispatch(tasksDoneTodayThunk());
      dispatch(tasksDoneWeeklyThunk());
    }
  };
  const updateTaskHandler = (updatedTask: Task) => {
    dispatch(updateTaskThunk(updatedTask))
      .then((responseAction) => {
        if (updateTaskThunk.fulfilled.match(responseAction)) {
          const task = responseAction.payload;
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
          dispatch(allCategoryByCardThunk(cardId));
          dispatch(allCategorythunk());
          dispatch(allTasksThunk());
          dispatch(allTasksByCardThunk(cardId));
          dispatch(tasksDueTodayThunk());
          dispatch(tasksDoneTodayThunk());
          dispatch(tasksDoneWeeklyThunk());
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
        error={error}
        onEdit={onEdit}
        addTask={addTask}
        updateTask={updateTaskHandler}
        onDone={onDone}
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

export default TaskContainer;
