import React from "react";
import { IonBadge, IonItem, IonLabel, IonList } from "@ionic/react";

import "./CategoryBadge.css";

function CategoryBadge() {
  return (
    <IonList className="list-container">
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Urgent</IonLabel>
        <IonBadge>1</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Running</IonLabel>
        <IonBadge>1</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Ongoing</IonLabel>
        <IonBadge>1</IonBadge>
      </IonItem>
    </IonList>
  );
}
export default CategoryBadge;
