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
import Category from "../Category/CategoryButton";

interface ElementCardProps {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  onOpen: (title: string, id: string) => void;
  taskCount?: number;
}

const ElementCard: React.FC<ElementCardProps> = ({
  title,
  id,
  onDelete,
  onOpen,
  taskCount,
}) => (
  <IonCard className="card-container">
    <div className="card-content">
      <IonItemSliding className="sliding-item">
        <IonItem
          className="custom-ion-item"
          lines="none"
          style={{ "--padding-start": 0, "--padding-end": 0 }}
          onClick={() => onOpen(title, id)}>
          <div className="left-content">
            <IonReorder />
            <IonCardTitle className="reorder-btn">{title}</IonCardTitle>
          </div>
          <div className="right-content">{taskCount} Tasks</div>
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption
            color="danger"
            onClick={() => onDelete(id)}
            className="item-option">
            <IonIcon slot="icon-only" icon={trash} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
      <Category />
    </div>
  </IonCard>
);

export default ElementCard;
