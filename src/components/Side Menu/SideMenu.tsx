import React, { useRef } from "react";
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
  const menuRef = useRef<HTMLIonMenuElement>(null);

  const handleMenuClick = (view: "topics" | "project") => {
    setView(view);
    menuRef.current?.close(); // Close the menu
  };

  return (
    <IonMenu contentId="main-content" ref={menuRef}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <div onClick={() => handleMenuClick("topics")}>Topics</div>
        <div onClick={() => handleMenuClick("project")}>Project</div>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
