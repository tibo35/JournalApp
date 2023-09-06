import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonLabel,
} from "@ionic/react";
import "./styles/NewTask.css";
import { Task } from "./taskTypes";
import TaskHeader from "./TaskHeader";
import TaskTitleContext from "./TaskTitleContext";
interface NewTaskProps {
  closeModal: () => void;
  addTask: (title: string, description: string, date: string) => void;
  task?: Task;
  updateTask?: (updatedTask: Task) => void;
}

const NewTask: React.FC<NewTaskProps> = ({
  closeModal,
  addTask,
  task,
  updateTask,
}) => {
  const titleRef = useRef<HTMLIonInputElement>(null);
  const descriptionRef = useRef<HTMLIonTextareaElement>(null);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [dueDate, setDueDate] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    if (task) {
      titleRef.current!.value = task.content;
      descriptionRef.current!.value = task.description;
      setSelectedDate(task.date);
      if (task.date) {
        setDueDate(true);
      }
    }
  }, [task]);

  const handleSave = () => {
    const dateObj = new Date(selectedDate);

    const currentTitle =
      typeof titleRef.current?.value === "string" ? titleRef.current.value : "";
    const currentDescription =
      typeof descriptionRef.current?.value === "string"
        ? descriptionRef.current.value
        : "";

    if (task && updateTask) {
      updateTask({
        ...task,
        content: currentTitle,
        description: currentDescription,
        date: selectedDate,
      });
    } else {
      addTask(currentTitle, currentDescription, selectedDate);
      console.log("Selected Date:", selectedDate);
    }
    closeModal();
  };
  const toggleDatePicker = () => {
    setShowDatePickerModal((prevState) => !prevState);
  };
  const title = task ? task.content : "New Task";

  return (
    <TaskTitleContext.Provider value={title}>
      <>
        <TaskHeader onClose={closeModal} />

        <div className="task-container">
          <IonLabel>
            Due Date: &nbsp;
            {dueDate ? formatDate(selectedDate) : ""}
          </IonLabel>

          <IonInput placeholder="Title" ref={titleRef} />

          <IonTextarea placeholder="Description" ref={descriptionRef} />

          <div className="date-picker-container">
            {showDatePickerModal && (
              <IonDatetime
                display-format="MM DD YY"
                placeholder="Select Date"
                value={selectedDate}
                onIonChange={(e) => {
                  if (typeof e.detail.value === "string") {
                    setSelectedDate(e.detail.value);
                    setDueDate(true);
                    setShowDatePickerModal(false);
                  }
                }}
              />
            )}
          </div>

          <div className="button-container">
            <IonButton expand="block" onClick={toggleDatePicker}>
              {task ? "Update Due Date" : "Add Due Date"}
            </IonButton>
            <IonButton onClick={handleSave}>
              {task ? "Update Task" : "Add Task"}
            </IonButton>
          </div>
        </div>
      </>
    </TaskTitleContext.Provider>
  );
};

export default NewTask;
