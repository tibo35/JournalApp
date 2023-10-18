import { IonBadge, IonItem, IonLabel, IonList } from "@ionic/react";
import "./CategoryBadge.css";
import { useEffect } from "react";
import { CategoryCounts } from "../../slices/taskSlice";

import { useDispatch } from "react-redux";
import { fetchCategoryCountAsync } from "../../slices/taskSlice";
import { AppDispatch } from "../../store";

interface CategoryBadgeProps {
  cardId: string;
  categoryCounts?: CategoryCounts;
}

function CategoryBadge({ cardId, categoryCounts }: CategoryBadgeProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategoryCountAsync(cardId));
  }, [cardId, dispatch]);

  return (
    <IonList className="list-container">
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Urgent</IonLabel>
        <IonBadge>{categoryCounts?.Urgent}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Running</IonLabel>
        <IonBadge>{categoryCounts?.Running}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Ongoing</IonLabel>
        <IonBadge>{categoryCounts?.Ongoing}</IonBadge>
      </IonItem>
    </IonList>
  );
}

export default CategoryBadge;
