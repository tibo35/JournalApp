// ContentHeader.tsx
import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";

type ContentHeaderProps = {
  view: "topics" | "project" | "PhotoOfTheDay";
};

const ContentHeader: React.FC<ContentHeaderProps> = ({ view }) => {
  let title;
  switch (view) {
    case "topics":
      title = "Category";
      break;
    case "project":
      title = "Project";
      break;
    case "PhotoOfTheDay":
      title = "Photo Of The Day";
      break;
    default:
      title = "";
      break;
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default ContentHeader;
