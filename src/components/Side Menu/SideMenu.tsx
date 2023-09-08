import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonFooter,
} from "@ionic/react";
import {
  gitPullRequestOutline,
  pricetagsOutline,
  imagesOutline,
  logOutOutline,
} from "ionicons/icons";
import "./SideMenu.css";

type SideMenuProps = {
  setView: (view: "topics" | "project" | "PhotoOfTheDay") => void;
};
const SideMenu: React.FC<SideMenuProps> = ({ setView }) => {
  const history = useHistory();
  const menuRef = useRef<HTMLIonMenuElement>(null);

  const handleMenuClick = (view: "topics" | "project" | "PhotoOfTheDay") => {
    setView(view);
    menuRef.current?.close();
  };
  const handleLogout = () => {
    history.push("/login");
  };
  return (
    <IonMenu contentId="main-content" ref={menuRef} className="menu-container">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="menu-items no-scroll">
        <div onClick={() => handleMenuClick("topics")} className="menu-option">
          <IonIcon icon={pricetagsOutline} className="menu-icon" />
          Topics
        </div>
        <div onClick={() => handleMenuClick("project")} className="menu-option">
          <IonIcon icon={gitPullRequestOutline} className="menu-icon" />
          Projects
        </div>
        <div
          onClick={() => handleMenuClick("PhotoOfTheDay")}
          className="menu-option">
          <IonIcon icon={imagesOutline} className="menu-icon" />
          Photo Of The Day
        </div>
      </IonContent>

      <IonFooter className="menu-footer">
        <div onClick={() => handleLogout()} className="menu-logout">
          <IonIcon icon={logOutOutline} className="menu-icon" />
          Logout
        </div>
      </IonFooter>
    </IonMenu>
  );
};

export default SideMenu;
