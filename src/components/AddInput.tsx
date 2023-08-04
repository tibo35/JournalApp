// Alert.tsx
import { IonAlert } from "@ionic/react";
import React from "react";

interface AlertProps {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  addCard: (title: string) => void;
}

const AddInput: React.FC<AlertProps> = ({
  showAlert,
  setShowAlert,
  addCard,
}) => (
  <IonAlert
    isOpen={showAlert}
    onDidDismiss={() => setShowAlert(false)}
    header={"New Card"}
    inputs={[
      {
        name: "title",
        type: "text",
        placeholder: "Card Title",
      },
    ]}
    buttons={[
      "Cancel",
      {
        text: "Ok",
        handler: (data) => {
          addCard(data.title);
        },
      },
    ]}
  />
);

export default AddInput;
