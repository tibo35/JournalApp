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
import {
  fetchTotalCategoryCountAsync,
  fetchAllTasksCount,
} from "../components/Redux/thunks/tasksThunk";

const Dashboards: React.FC = () => {
  const [tasksDueToday, setTasksDueToday] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Dispatch actions to fetch the required data
    dispatch(fetchAllTasksCount());
    dispatch(fetchTotalCategoryCountAsync());
  }, [dispatch]);

  const totalCategoryCounts = useSelector(
    (state: RootState) => state.tasks.totalCategoryCounts
  );
  const totalTasksCount = useSelector(
    (state: RootState) => state.tasks.totalTasksCount
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

          <div className="wrapper">
            <div className="container-dashboard">
              <div className="ion-activatable ripple-parent circle">
                {totalTasksCount}
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Total Tasks</IonText>
            </div>
            <div className="item">
              <div className="ion-activatable ripple-parent circle">
                {totalCategoryCounts?.URGENT ?? 0}
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Urgent</IonText>
            </div>
            <div className="item">
              <div className="ion-activatable ripple-parent circle">
                {totalCategoryCounts?.ONGOING ?? 0}
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Ongoing</IonText>
            </div>
            <div className="item">
              <div className="ion-activatable ripple-parent circle">
                {totalCategoryCounts?.RUNNING ?? 0}
                <IonRippleEffect type="unbounded"></IonRippleEffect>
              </div>
              <IonText>Running</IonText>
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
