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
import { CircularProgress } from "../components/Dashboard/CircularProgress";

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
        {/* Daily Goal Progress */}
        <div className="daily-goal">
          <IonTitle className="title" size="small">
            Daily goal
          </IonTitle>
          <div className="progress-circular">
            <CircularProgress value={60} />
            {/* Replace 68 with your dynamic value */}
          </div>
          <IonText>Almost there! Keep it going</IonText>
        </div>

        {/* Week-wise Statistics */}
        <div className="statistics">
          <IonTitle className="title" size="small">
            Statistics
          </IonTitle>
          <div className="stat-bars">
            {/* Bars */}
            {[
              { id: "Mon", label: "M", value: 6 },
              { id: "Tue", label: "T", value: 4 },
              { id: "Wed", label: "W", value: 4 },
              { id: "Thu", label: "T", value: 4 },
              { id: "Fri", label: "F", value: 4 },
              { id: "Sat", label: "S", value: 4 },
              { id: "Sun", label: "S", value: 4 },
            ].map((stat) => (
              <div
                className="bar"
                style={{ height: `${stat.value * 40}px` }}
                key={stat.id}>
                <span className="bar-value">{stat.value}</span>
              </div>
            ))}
          </div>
          {/* Days */}
          <div className="days">
            {[
              { id: "Mon", label: "M", value: 6 },
              { id: "Tue", label: "T", value: 4 },
              { id: "Wed", label: "W", value: 4 },
              { id: "Thu", label: "T", value: 4 },
              { id: "Fri", label: "F", value: 4 },
              { id: "Sat", label: "S", value: 4 },
              { id: "Sun", label: "S", value: 4 },
            ].map((stat) => (
              <div className="day-label" key={stat.id}>
                <IonText>{stat.label}</IonText>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboards;
