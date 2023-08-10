import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonReorderGroup,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { fetchTopics, deleteTopic, postTopic } from "../Api/ApiTab2";

import "./Tab2.css";
import TaskModal from "../components/Tasks/TaskModal";
import TopicCard from "../components/Topics/TopicCard";
import AddInput from "../components/AddInput";
import SideMenu from "../components/Side Menu/SideMenu";
import ContentHeader from "../components/Side Menu/ContentHeader";

const Tab2: React.FC = () => {
  const [cards, setCards] = useState([{ id: "1", title: "Card Title 1" }]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [currentCardId, setCurrentCardId] = useState<string | null>(null); // Added state for cardId
  const [view, setView] = useState<"topics" | "project">("topics"); // To keep track of the selected view

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
  const doReorder = (event: any) => {
    const draggedItem = cards.splice(event.detail.from, 1)[0];
    cards.splice(event.detail.to, 0, draggedItem);
    setCards([...cards]);
    event.detail.complete();
  };

  return (
    <IonPage>
      <SideMenu setView={setView} />
      <IonContent fullscreen className="tab2-page" id="main-content">
        <ContentHeader view={view} />
        {view === "topics" && (
          <>
            <IonReorderGroup onIonItemReorder={doReorder} disabled={false}>
              {cards.map((card) => (
                <TopicCard
                  key={card.id}
                  title={card.title}
                  id={card.id}
                  onOpen={() => openModal(card.title, card.id)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    deleteCard(card.id);
                  }}
                />
              ))}
            </IonReorderGroup>
            <IonModal
              isOpen={showModal}
              onDidDismiss={() => setShowModal(false)}>
              <TaskModal
                title={modalContent}
                cardId={currentCardId || ""}
                onClose={closeModal}
              />
            </IonModal>
          </>
        )}

        {view === "project" && (
          <div>{/* Your Project Related Content Here */}</div>
        )}
      </IonContent>

      {view === "topics" && (
        <>
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
      )}

      {/* You can add a similar fab button for 'project' view if needed */}
    </IonPage>
  );
};

export default Tab2;
