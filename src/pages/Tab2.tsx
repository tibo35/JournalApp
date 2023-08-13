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
import {
  fetchTopics,
  deleteTopic,
  postTopic,
  postProject,
  fetchProjects,
  deleteProject,
  postPhoto,
  fetchPhoto,
  deletePhoto,
} from "../Api/ApiTab2";

import "./Tab2.css";
import TaskModal from "../components/Tasks/TaskModal";
import TopicCard from "../components/Topics/TopicCard";
import PhotoCard from "../components/PhotoCard";
import AddInput from "../components/Topics/AddInput";
import AddPhoto from "../components/AddPhoto";
import AddProject from "../components/Projects/AddProject";
import SideMenu from "../components/Side Menu/SideMenu";
import ContentHeader from "../components/Side Menu/ContentHeader";
import ProjectCard from "../components/Projects/ProjectCard";

const Tab2: React.FC = () => {
  const [cards, setCards] = useState([{ id: "1", title: "Card Title 1" }]);
  const [projects, setProjects] = useState([
    { id: "1", title: "Project Title 1" },
  ]);
  const [photo, setPhoto] = useState([{ id: "1", title: "Photo Title 1" }]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [view, setView] = useState<"topics" | "project" | "PhotoOfTheDay">(
    "topics"
  );

  useEffect(() => {
    fetchTopics().then((data) => {
      setCards(
        data.map((card: any) => ({
          id: card._id,
          title: card.title,
        }))
      );
    });
    fetchProjects()
      .then((data) => {
        setProjects(
          data.map((project: any) => ({
            id: project._id,
            title: project.title,
          }))
        );
      })
      .catch((error) => console.error("Fetch error:", error));
    fetchPhoto()
      .then((data) => {
        setPhoto(
          data.map((photoItem: any) => ({
            id: photoItem._id,
            title: photoItem.title,
          }))
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const addProject = (title: string) => {
    postProject(title)
      .then((data) => {
        setProjects((prevProjects) => [
          ...prevProjects,
          { id: data._id, title: data.title },
        ]);
      })
      .catch((error) => console.error("Fetch error:", error));
  };
  const addPhoto = (title: string) => {
    postPhoto(title)
      .then((data) => {
        setPhoto((prevPhotos) => [
          ...prevPhotos,
          { id: data._id, title: data.title },
        ]);
      })
      .catch((error) => console.error("Fetch error:", error));
  };
  const deleteCard = (id: string) => {
    deleteTopic(id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  const deleteProjectFromBackend = (id: string): Promise<void> => {
    return deleteProject(id)
      .then(() => {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== id)
        );
      })
      .catch((error: any) => {
        console.error("Delete error:", error);
        throw error; // Re-throw the error so it can be handled by any component that might be using this function.
      });
  };
  const deletePhotoFromBackend = (id: string): Promise<void> => {
    return deletePhoto(id)
      .then(() => {
        setPhoto((prevPhotos) =>
          prevPhotos.filter((photoItem) => photoItem.id !== id)
        );
      })
      .catch((error: any) => {
        console.error("Delete error:", error);
        throw error;
      });
  };

  const openModal = (title: string, id: string) => {
    console.log("Opening modal with title:", title);
    setModalContent(title);
    setCurrentCardId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setShowModal(false);
    setCurrentCardId(null);
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

        {view === "project" && (
          <>
            <IonReorderGroup onIonItemReorder={doReorder} disabled={false}>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  deleteProject={deleteProjectFromBackend}
                  onOpen={() => openModal(project.title, project.id)}
                />
              ))}
            </IonReorderGroup>
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => setShowAlert(true)}>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
            <AddProject
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              addProject={addProject}
            />
          </>
        )}
        {view === "PhotoOfTheDay" && (
          <>
            <IonReorderGroup onIonItemReorder={doReorder} disabled={false}>
              {photo.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  title={photo.title}
                  id={photo.id}
                  onOpen={() => openModal(photo.title, photo.id)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    deletePhotoFromBackend(photo.id);
                  }}
                />
              ))}
            </IonReorderGroup>
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
              <IonFabButton onClick={() => setShowAlert(true)}>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
            </IonFab>
            <AddPhoto
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              addPhoto={addPhoto}
            />
          </>
        )}
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
