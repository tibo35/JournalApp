import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonInput,
  IonTextarea,
  IonLabel,
  IonDatetime,
} from "@ionic/react";
import "./styles/NewTask.css";
import { Task } from "./taskTypes";
import { IonIcon } from "@ionic/react";
import { closeCircle, calendarNumberOutline } from "ionicons/icons";
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
    // setShowDatePickerModal((prevState) => !prevState);
    setShowDatePickerModal(true);
  };
  const title = task ? task.content : "New Task";

  return (
    <TaskTitleContext.Provider value={title}>
      <>
        <div className="header-container">
          <IonInput
            className="header-title"
            placeholder="Title"
            ref={titleRef}
          />
          <IonButton onClick={closeModal} fill="clear">
            <IonIcon className="close-icon" icon={closeCircle} />
          </IonButton>
        </div>
        <div className="task-container">
          <div className="date-container">
            <IonLabel className="custom-label">DATE</IonLabel>
            <div className="date-input">
              <IonInput
                placeholder="DD-MM-YYYY"
                type="text"
                className="ionic-date-input"
                value={dueDate ? formatDate(selectedDate) : ""}
                readonly
                onClick={toggleDatePicker}
              />
              <IonIcon className="calendar-icon" icon={calendarNumberOutline} />
            </div>
            {showDatePickerModal && (
              <IonDatetime
                className="ionic-datetime-modal"
                value={selectedDate}
                onIonChange={(e) => {
                  if (typeof e.detail.value === "string") {
                    setSelectedDate(e.detail.value);
                  }
                  setShowDatePickerModal(false);
                  setDueDate(true);
                }}
              />
            )}
          </div>

          <div>
            <IonLabel className="custom-label">DESCRIPTION</IonLabel>
            <IonTextarea className="description" ref={descriptionRef} />
          </div>
          <div>
            <IonLabel className="custom-label">CATEGORY</IonLabel>
            <IonTextarea />
          </div>
          <div className="task-btn">
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
