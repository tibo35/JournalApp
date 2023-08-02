import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAlert,
  IonButton,
  IonModal,
  IonPopover,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import React, { useState } from "react";
import TaskModal from "../components/TaskModal";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const [cards, setCards] = useState([{ id: 1, title: "Card Title 1" }]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const deleteCard = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const openModal = (title: string) => {
    setModalContent(title);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const addCard = (title: string) => {
    setCards((prevCards) => [
      ...prevCards,
      { id: prevCards.length + 1, title },
    ]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Topic</IonTitle>
          </IonToolbar>
        </IonHeader>
        {cards.map((card) => (
          <IonCard key={card.id} onClick={() => openModal(card.title)}>
            <IonCardHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <IonCardTitle>{card.title}</IonCardTitle>
                <IonButton fill="clear" onClick={() => deleteCard(card.id)}>
                  <IonIcon icon={trash} color="danger" />
                </IonButton>
              </div>
            </IonCardHeader>
          </IonCard>
        ))}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <TaskModal title={modalContent} onClose={closeModal} />
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowAlert(true)}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"New Card"}
        inputs={[
          {
            name: "title",
            type: "text",
            placeholder: "Card Title",
          },
        ]}
        buttons={[
          "Cancel",
          {
            text: "Ok",
            handler: (data) => {
              addCard(data.title);
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default Tab2;
