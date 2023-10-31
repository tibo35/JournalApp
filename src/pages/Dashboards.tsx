import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";
import "./Dashboards.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/store";
import { AppDispatch } from "../../src/store";
import {
  allCategorythunk,
  allTasksThunk,
  tasksDueTodayThunk,
  tasksDoneTodayThunk,
  tasksDoneWeeklyThunk,
} from "../components/Redux/thunks/tasksThunk";
import { CircularProgress } from "../components/Dashboard/CircularProgress";

const Dashboards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Dispatch actions to fetch the required data
    dispatch(allTasksThunk());
    dispatch(allCategorythunk());
    dispatch(tasksDueTodayThunk());
    dispatch(tasksDoneTodayThunk());
    dispatch(tasksDoneWeeklyThunk());
  }, [dispatch]);
  const tasksDoneWeekly = useSelector(
    (state: RootState) => state.tasks.tasksDoneWeekly
  );
  const tasksDoneTodayCount = useSelector(
    (state: RootState) => state.tasks.doneTasksCount
  );
  const tasksDueTodayCount = useSelector(
    (state: RootState) => state.tasks.tasksForTodayCount
  );
  const totalCategoryCounts = useSelector(
    (state: RootState) => state.tasks.totalCategoryCounts
  );
  const progressValue =
    tasksDueTodayCount === 0
      ? 0
      : (tasksDoneTodayCount / tasksDueTodayCount) * 100;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="dashboard-main">
        {/* Daily Goal Progress */}
        <div className="daily-goal">
          <IonTitle className="title" size="small">
            Daily goal
          </IonTitle>
          <div className="progress-circular">
            <CircularProgress value={progressValue} />
            {/* Replace 68 with your dynamic value */}
          </div>
          <IonText>
            {tasksDoneTodayCount} Out of {tasksDueTodayCount}
          </IonText>
          <IonText>Almost there! Keep it going</IonText>
        </div>

        {/* Week-wise Statistics */}
        <div className="statistics">
          <IonTitle className="title" size="small">
            Statistics
          </IonTitle>
          <div className="stat-bars">
            {[
              { id: "Mon", label: "M", value: tasksDoneWeekly.Mon },
              { id: "Tue", label: "T", value: tasksDoneWeekly.Tue },
              { id: "Wed", label: "W", value: tasksDoneWeekly.Wed },
              { id: "Thu", label: "T", value: tasksDoneWeekly.Thu },
              { id: "Fri", label: "F", value: tasksDoneWeekly.Fri },
              { id: "Sat", label: "S", value: tasksDoneWeekly.Sat },
              { id: "Sun", label: "S", value: tasksDoneWeekly.Sun },
            ].map(
              (stat) =>
                stat.value > 0 && (
                  <div
                    className="bar"
                    style={{ height: `${stat.value * 40}px` }}
                    key={stat.id}>
                    <span className="bar-value">{stat.value}</span>
                  </div>
                )
            )}
          </div>
          {/* Days */}
          <div className="days">
            {[
              { id: "Mon", label: "M", value: tasksDoneWeekly.Mon },
              { id: "Tue", label: "T", value: tasksDoneWeekly.Tue },
              { id: "Wed", label: "W", value: tasksDoneWeekly.Wed },
              { id: "Thu", label: "T", value: tasksDoneWeekly.Thu },
              { id: "Fri", label: "F", value: tasksDoneWeekly.Fri },
              { id: "Sat", label: "S", value: tasksDoneWeekly.Sat },
              { id: "Sun", label: "S", value: tasksDoneWeekly.Sun },
            ].map((stat) => (
              <div className="day-label" key={stat.id}>
                <IonText>{stat.label}</IonText>
              </div>
            ))}
          </div>
        </div>
        <div className="statistics">
          <IonTitle className="title" size="small">
            Category
          </IonTitle>
          <div>Urgent {totalCategoryCounts?.Urgent ?? 0}</div>
          <div>Running {totalCategoryCounts?.Running ?? 0}</div>
          <div>Ongoing {totalCategoryCounts?.Ongoing ?? 0}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboards;
