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
  view: "topics" | "project";
};

const ContentHeader: React.FC<ContentHeaderProps> = ({ view }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>{view === "topics" ? "Topics" : "Project"}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default ContentHeader;
