import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React from "react";

interface CardProps {
  title: string;
  id: string;
  onDelete: (event: React.MouseEvent) => void;
  onOpen: () => void;
}

const TopicCard: React.FC<CardProps> = ({ title, id, onDelete, onOpen }) => (
  <IonCard onClick={onOpen}>
    <IonCardHeader>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <IonCardTitle>{title}</IonCardTitle>
        <IonButton onClick={onDelete}>
          <IonIcon icon={trash} color="danger" />
        </IonButton>
      </div>
    </IonCardHeader>
  </IonCard>
);

export default TopicCard;
