import React, { useEffect } from "react";
import {
  IonCard,
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
import CategoryBadge from "../Category/CategoryBadge";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { fetchTasksAsync } from "../Redux/thunks/tasksThunk";
interface ElementCardProps {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  onOpen: (title: string, id: string) => void;
}

const ElementCard: React.FC<ElementCardProps> = ({
  title,
  id,
  onDelete,
  onOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const categoryCounts = useSelector(
    (state: RootState) => state.tasks.categoryCountsByCard[id]
  );

  const taskCount = useSelector(
    (state: RootState) => state.tasks.taskCountsByCard[id]
  );

  useEffect(() => {
    dispatch(fetchTasksAsync(id));
    console.log("taskCount: " + taskCount);
  }, [dispatch, id]);

  return (
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
        <CategoryBadge cardId={id} categoryCounts={categoryCounts} />
      </div>
    </IonCard>
  );
};
export default ElementCard;
