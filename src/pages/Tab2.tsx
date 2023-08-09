import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal";
import "./Tab2.css";
import TopicCard from "../components/TopicCard";
import AddInput from "../components/AddInput";
import { fetchTopics, deleteTopic, postTopic } from "../Api/ApiTab2";

const Tab2: React.FC = () => {
  const [cards, setCards] = useState([{ id: "1", title: "Card Title 1" }]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [currentCardId, setCurrentCardId] = useState<string | null>(null); // Added state for cardId

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setCards(
          data.map((card: any) => ({
            id: card._id,
            title: card.title,
          }))
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const deleteCard = (id: string) => {
    deleteTopic(id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const openModal = (title: string, id: string) => {
    // Added id parameter
    setModalContent(title);
    setCurrentCardId(id); // Store the card ID in the state
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCardId(null); // Clear the card ID when modal closes
  };

  const addCard = (title: string) => {
    postTopic(title)
      .then((data) => {
        setCards((prevCards) => [
          ...prevCards,
          { id: data._id, title: data.title },
        ]);
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <IonPage>
      <IonContent fullscreen className="tab2-page">
        {cards.map((card) => (
          <TopicCard
            key={card.id}
            title={card.title}
            id={card.id}
            onOpen={() => openModal(card.title, card.id)} // Passing id to openModal
            onDelete={(e) => {
              e.stopPropagation();
              deleteCard(card.id);
            }}
          />
        ))}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <TaskModal
            title={modalContent}
            cardId={currentCardId || ""}
            onClose={closeModal}
          />
        </IonModal>
      </IonContent>
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
    </IonPage>
  );
};

export default Tab2;
