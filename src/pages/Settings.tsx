import {
  IonBackButton,
  IonButton,
  IonPage,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRange,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Settings.css";
import type { ToggleCustomEvent } from "@ionic/react";
import {
  personCircle,
  personCircleOutline,
  sunny,
  sunnyOutline,
} from "ionicons/icons";
import React, { useState, useEffect } from "react";

const Settings: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState(false);

  const toggleChange = (ev: ToggleCustomEvent) => {
    toggleDarkTheme(ev.detail.checked);
  };

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
    localStorage.setItem("isDarkTheme", JSON.stringify(shouldAdd)); // Store preference
  };

  const initializeDarkTheme = (isDark: boolean) => {
    setThemeToggle(isDark);
    toggleDarkTheme(isDark);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    // Check for stored preference, else use system preference
    const storedThemePreference = localStorage.getItem("isDarkTheme");
    const isDark =
      storedThemePreference !== null
        ? JSON.parse(storedThemePreference)
        : prefersDark.matches;

    initializeDarkTheme(isDark);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", (mediaQuery) =>
      initializeDarkTheme(mediaQuery.matches)
    );
  }, []);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Display</IonTitle>
          <IonButtons slot="end">
            <IonButton color="dark">
              <IonIcon
                slot="icon-only"
                ios={personCircleOutline}
                md={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonListHeader>Appearance</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              checked={themeToggle}
              onIonChange={toggleChange}
              justify="space-between">
              Dark Mode
            </IonToggle>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem button={true}>Text Size</IonItem>
          <IonItem>
            <IonToggle justify="space-between">Bold Text</IonToggle>
          </IonItem>
        </IonList>

        <IonListHeader>Brightness</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonRange value={40}>
              <IonIcon icon={sunnyOutline} slot="start"></IonIcon>
              <IonIcon icon={sunny} slot="end"></IonIcon>
            </IonRange>
          </IonItem>
          <IonItem>
            <IonToggle justify="space-between" checked>
              True Tone
            </IonToggle>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem button={true}>
            <IonLabel>Night Shift</IonLabel>
            <IonText slot="end" color="medium">
              9:00 PM to 8:00 AM
            </IonText>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Settings;
