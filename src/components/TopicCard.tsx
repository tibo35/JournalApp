import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonReorder,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import React from "react";

interface CardProps {
  title: string;
  id: string;
  onDelete: (event: React.MouseEvent) => void;
  onOpen: (id: string) => void; // Pass the id when opening
}

const TopicCard: React.FC<CardProps> = ({ title, id, onDelete, onOpen }) => (
  <IonCard onClick={() => onOpen(id)}>
    {" "}
    {/* Pass the id when the card is clicked */}
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
        <IonReorder />
      </div>
    </IonCardHeader>
  </IonCard>
);

export default TopicCard;
