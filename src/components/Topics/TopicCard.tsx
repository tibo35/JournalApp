import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
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
  onDelete: (event: React.MouseEvent) => void;
  onOpen: (id: string) => void;
}

const TopicCard: React.FC<CardProps> = ({ title, id, onDelete, onOpen }) => (
  <IonCard>
    <IonItemSliding>
      <IonItem onClick={() => onOpen(id)}>
        <IonCardHeader className="card-header">
          <IonReorder />
          <IonCardTitle className="reorder-btn">{title}</IonCardTitle>
        </IonCardHeader>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={onDelete}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  </IonCard>
);

export default TopicCard;
