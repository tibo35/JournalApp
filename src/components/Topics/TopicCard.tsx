import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonReorder,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import "./TopicCard.css";
interface CardProps {
  title: string;
  id: string;
  taskCount: number;
  onDelete: (event: React.MouseEvent) => void;
  onOpen: (id: string) => void;
}

const TopicCard: React.FC<CardProps> = ({
  title,
  taskCount,
  id,
  onDelete,
  onOpen,
}) => (
  <IonCard>
    <IonItemSliding>
      <IonItem onClick={() => onOpen(id)}>
        <IonReorder />
        <IonCardHeader className="card-header">
          <IonCardTitle className="reorder-btn">{title}</IonCardTitle>
        </IonCardHeader>
      </IonItem>
      <IonItem>{taskCount} Tasks</IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  </IonCard>
);

export default TopicCard;
