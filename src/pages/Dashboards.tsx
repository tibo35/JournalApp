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
import { fetchTasksDueToday } from "../Api/TasksDueTodayAPI";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/store";
import { AppDispatch } from "../../src/store";
import { fetchTotalCategoryCountAsync } from "../components/Redux/thunks/tasksThunk";

const Dashboards: React.FC = () => {
  const [tasksDueToday, setTasksDueToday] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchTasksDueToday()
      .then((data) => setTasksDueToday(data))
      .catch((error) => console.error("Failed to fetch tasks:", error));

    dispatch(fetchTotalCategoryCountAsync());

    // This will execute every time totalCategoryCounts changes
    console.log("Total Category Counts:", totalCategoryCounts);
  }, []);

  const totalCategoryCounts = useSelector(
    (state: RootState) => state.tasks.totalCategoryCounts
  );

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
            <div className="item">
              <div className="ion-activatable ripple-parent circle">
                {totalCategoryCounts?.URGENT ?? 0}

                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Urgent</IonText>
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
