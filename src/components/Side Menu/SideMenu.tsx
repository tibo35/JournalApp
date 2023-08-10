import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

type SideMenuProps = {
  setView: (view: "topics" | "project") => void;
};

const SideMenu: React.FC<SideMenuProps> = ({ setView }) => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <div onClick={() => setView("topics")}>Topics</div>
        <div onClick={() => setView("project")}>Project</div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
