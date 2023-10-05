import { IonBadge, IonItem, IonLabel, IonList } from "@ionic/react";
import "./CategoryBadge.css";
import { useCategoryCount } from "../Hooks/useCategoryCount";
interface CategoryBadgeProps {
  cardId: string;
}

function CategoryBadge({ cardId }: CategoryBadgeProps) {
  const categoryCount = useCategoryCount(cardId);

  return (
    <IonList className="list-container">
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Urgent</IonLabel>
        <IonBadge>{categoryCount.Urgent}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Running</IonLabel>
        <IonBadge>{categoryCount.Running}</IonBadge>
      </IonItem>
      <IonItem className="ion-item">
        <IonLabel className="ion-label">Ongoing</IonLabel>
        <IonBadge>{categoryCount.Ongoing}</IonBadge>
      </IonItem>
    </IonList>
  );
}

export default CategoryBadge;
