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

const Dashboards: React.FC = () => {
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
          <IonText color="secondary">You have {} tasks due today </IonText>

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
