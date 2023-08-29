import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonRippleEffect,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Dashboards.css";
import React, { useState, useEffect } from "react";
import { fetchTasksDueToday } from "../Api/Api";

const Dashboards: React.FC = () => {
  const [tasksDueToday, setTasksDueToday] = useState<any[]>([]);

  useEffect(() => {
    fetchTasksDueToday()
      .then((data) => setTasksDueToday(data))
      .catch((error) => console.error("Failed to fetch tasks:", error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="content-today">
          <IonTitle color="primary">Today</IonTitle>
          <IonText color="secondary">
            You have {tasksDueToday.length} tasks due today
          </IonText>

          <div className="wrapper">
            <div className="container-dashboard">
              <div className="ion-activatable ripple-parent circle">
                8<IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Due Today</IonText>
            </div>
            <div className="item">
              <div className="ion-activatable ripple-parent circle">
                5<IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Open</IonText>
            </div>
          </div>
        </div>

        <div className="content-overview">
          <IonTitle color="primary">Overview</IonTitle>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboards;
