import { IonAlert } from "@ionic/react";
import React from "react";

interface AlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  addProject: (title: string) => void;
}

const AddProject: React.FC<AlertProps> = ({
  showAlert,
  setShowAlert,
  addProject,
}) => (
  <IonAlert
    isOpen={showAlert}
    onDidDismiss={() => setShowAlert(false)}
    header={"New Project"}
    inputs={[
      {
        name: "title",
        type: "text",
        placeholder: "Project Title",
      },
    ]}
    buttons={[
      "Cancel",
      {
        text: "Ok",
        handler: (data) => {
          addProject(data.title);
        },
      },
    ]}
  />
);

export default AddProject;
