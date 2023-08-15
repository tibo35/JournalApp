import React from "react";
import {
  IonFooter,
  IonInput,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { calendarNumberOutline, add } from "ionicons/icons";
import "./TaskFooter.css";

interface TaskFooterProps {
  taskInput: string;
  setTaskInput: (value: string) => void;
  showDatePicker: boolean;
  setShowDatePicker: (value: boolean) => void;
  addTask: () => void;
}

const TaskFooter: React.FC<TaskFooterProps> = ({
  taskInput,
  setTaskInput,
  showDatePicker,
  setShowDatePicker,
  addTask,
}) => (
  <IonFooter>
    <div className="container-items">
      <IonInput
        className="task-input"
        value={taskInput}
        placeholder="Type here"
        type="text"
        onInput={(e) => setTaskInput((e.target as HTMLInputElement).value)}
      />
      <IonIcon
        className="calendar-icon"
        icon={calendarNumberOutline}
        onClick={() => setShowDatePicker(!showDatePicker)}
      />
      <IonFab
        className="add-button"
        vertical="bottom"
        horizontal="end"
        slot="fixed">
        <IonFabButton onClick={addTask}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </div>
  </IonFooter>
);

export default TaskFooter;
