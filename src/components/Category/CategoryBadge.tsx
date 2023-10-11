import { IonBadge, IonItem, IonLabel, IonList } from "@ionic/react";
import "./CategoryBadge.css";
import { useCategoryCount } from "../Hooks/useCategoryCount";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryCountAsync } from "../../slices/taskSlice";
import { AppDispatch, AppStore } from "../../store";

interface CategoryBadgeProps {
  cardId: string;
}

function CategoryBadge({ cardId }: CategoryBadgeProps) {
  console.log("CategoryBadge rendered", cardId);

  const dispatch = useDispatch<AppDispatch>();
  const categoryCount = useSelector(
    (state: AppStore) => state.tasks.categoryCount
  );

  useEffect(() => {
    dispatch(fetchCategoryCountAsync(cardId));
  }, [cardId, dispatch]);

  return (
    <IonList className="list-container">
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Urgent</IonLabel>
        <IonBadge>{categoryCount?.Urgent}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Running</IonLabel>
        <IonBadge>{categoryCount?.Running}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Ongoing</IonLabel>
        <IonBadge>{categoryCount?.Ongoing}</IonBadge>
      </IonItem>
    </IonList>
  );
}

export default CategoryBadge;
