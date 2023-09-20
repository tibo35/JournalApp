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
import "../Elements/ElementCard.css";

interface ElementCardProps {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  onOpen: (title: string, id: string) => void;
  taskCount: number;
}

const ElementCard: React.FC<ElementCardProps> = ({
  title,
  id,
  onDelete,
  onOpen,
  taskCount,
}) => (
  <IonCard>
    <IonItemSliding>
      <IonItem onClick={() => onOpen(title, id)}>
        <IonReorder />
        <IonCardHeader className="card-header">
          <IonCardTitle className="reorder-btn">{title}</IonCardTitle>
        </IonCardHeader>
        <IonItem>{taskCount} Tasks</IonItem>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(id)}>
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  </IonCard>
);

export default ElementCard;
