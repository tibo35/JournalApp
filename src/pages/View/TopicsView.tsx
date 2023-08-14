import React, { useState } from "react";
import { IonReorderGroup, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import TopicCard from "../../components/Topics/TopicCard";
import AddInput from "../../components/Topics/AddInput";
import useItem from "../../components/Hooks/UseItem";
import { fetchTopics, postTopic, deleteTopic } from "../../Api/ApiTab2";

interface TopicsViewProps {
  openModal: (title: string, id: string) => void;
}
const TopicsView: React.FC<TopicsViewProps> = ({ openModal }) => {
  const {
    items: cards,
    addItem: addCard,
    deleteItem: deleteCard,
    reorderItems,
  } = useItem(fetchTopics, postTopic, deleteTopic);

  const [showAlert, setShowAlert] = useState(false);
  const handleReorder = (event: CustomEvent) => {
    const from = event.detail.from;
    const to = event.detail.to;
    reorderItems(from, to);
    event.detail.complete();
  };

  return (
    <>
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
        {cards.map((card) => (
          <TopicCard
            key={card.id}
            title={card.title}
            id={card.id}
            onDelete={() => deleteCard(card.id)}
            onOpen={() => openModal(card.title, card.id)}
          />
        ))}
      </IonReorderGroup>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => setShowAlert(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <AddInput
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        addCard={addCard}
      />
    </>
  );
};

export default TopicsView;
