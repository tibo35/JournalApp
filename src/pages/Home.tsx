import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";

import "./Home.css";
import TaskContainer from "../components/Tasks/TaskModal";
import TopicsView from "./View/TopicsView";
import PhotoView from "./View/PhotoView";
import ProjectsView from "./View/ProjectsView";

import SideMenu from "../components/Side Menu/SideMenu";
import ContentHeader from "../components/Side Menu/ContentHeader";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
      <IonContent fullscreen className="home-page" id="main-content">
        <ContentHeader view={view} />

        {view === "topics" && <TopicsView openModal={openModal} />}

        {view === "project" && <ProjectsView openModal={openModal} />}

        {view === "PhotoOfTheDay" && <PhotoView openModal={openModal} />}
      </IonContent>
      {showModal && (
        <div className="overlay">
          <div className="custom-modal">
            <TaskContainer
              title={modalContent}
              cardId={currentCardId || ""}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </IonPage>
  );
};

export default Home;
