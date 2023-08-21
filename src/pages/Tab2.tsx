import { IonContent, IonPage, IonModal } from "@ionic/react";
import React, { useState } from "react";

import "./Tab2.css";
import TaskModal from "../components/Tasks/TaskModal";
import TopicsView from "./View/TopicsView";
import PhotoView from "./View/PhotoView";
import ProjectsView from "./View/ProjectsView";

import SideMenu from "../components/Side Menu/SideMenu";
import ContentHeader from "../components/Side Menu/ContentHeader";

const Tab2: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [view, setView] = useState<"topics" | "project" | "PhotoOfTheDay">(
    "topics"
  );

  const openModal = (title: string, id: string) => {
    setModalContent(title);
    setCurrentCardId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCardId(null);
  };

  return (
    <IonPage>
      <SideMenu setView={setView} />
      <IonContent fullscreen className="tab2-page" id="main-content">
        <ContentHeader view={view} />

        {view === "topics" && <TopicsView openModal={openModal} />}

        {view === "project" && <ProjectsView openModal={openModal} />}

        {view === "PhotoOfTheDay" && <PhotoView openModal={openModal} />}
      </IonContent>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <TaskModal
          title={modalContent}
          cardId={currentCardId || ""}
          onClose={closeModal}
        />
      </IonModal>
    </IonPage>
  );
};

export default Tab2;
