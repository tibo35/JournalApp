import { IonAlert } from "@ionic/react";
import React from "react";

interface AlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  addPhoto: (title: string) => void;
}

const AddPhoto: React.FC<AlertProps> = ({
  showAlert,
  setShowAlert,
  addPhoto,
}) => (
  <IonAlert
    isOpen={showAlert}
    onDidDismiss={() => setShowAlert(false)}
    header={"New Photo"}
    inputs={[
      {
        name: "title",
        type: "text",
        placeholder: "Photo Title",
      },
    ]}
    buttons={[
      "Cancel",
      {
        text: "Ok",
        handler: (data) => {
          addPhoto(data.title);
        },
      },
    ]}
  />
);

export default AddPhoto;
