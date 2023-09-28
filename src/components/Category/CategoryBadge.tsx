import React, { useState, useEffect } from "react";
import { IonBadge, IonItem, IonLabel, IonList } from "@ionic/react";
import { fetchCategoryCount } from "../../Api/TasksAPI";

import "./CategoryBadge.css";
interface CategoryBadgeProps {
  cardId: string;
}
interface CategoryCounts {
  Urgent: number;
  Running: number;
  Ongoing: number;
}

function CategoryBadge({ cardId }: CategoryBadgeProps) {
  const [categoryCounts, setCategoryCounts] = useState({
    Urgent: 0,
    Running: 0,
    Ongoing: 0,
  });

  useEffect(() => {
    async function getCategoryCounts() {
      try {
        console.log("Fetching category count for cardId:", cardId); // Add this line to log cardId

        const counts: { [key: string]: number } = await fetchCategoryCount(
          cardId
        );
        console.log("Counts:", counts);

        // Convert keys to title case
        const formattedCounts: CategoryCounts = {
          Urgent: 0,
          Running: 0,
          Ongoing: 0,
        };

        for (let key in counts) {
          const formattedKey = (key.charAt(0) +
            key.slice(1).toLowerCase()) as keyof CategoryCounts;
          formattedCounts[formattedKey] = counts[key];
        }
        console.log("Formatted Counts:", formattedCounts);

        setCategoryCounts(formattedCounts);
      } catch (error) {
        console.error("Error fetching category count:", error);
      }
    }
    getCategoryCounts();
  }, [cardId]);

  return (
    <IonList className="list-container">
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Urgent</IonLabel>
        <IonBadge>{categoryCounts.Urgent}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Running</IonLabel>
        <IonBadge>{categoryCounts.Running}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Ongoing</IonLabel>
        <IonBadge>{categoryCounts.Ongoing}</IonBadge>
      </IonItem>
    </IonList>
  );
}
export default CategoryBadge;
