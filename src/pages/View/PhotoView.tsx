import React, { useState, useEffect } from "react";
import { IonReorderGroup, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import PhotoCard from "../../components/Photo/PhotoCard";
import AddPhoto from "../../components/Photo/AddPhoto";
import { fetchPhoto, postPhoto, deletePhoto } from "../../Api/ApiTab2";
interface FetchedPhoto {
  _id: string;
  title: string;
}

interface PhotoViewProps {
  openModal: (title: string, id: string) => void;
}

const PhotoView: React.FC<PhotoViewProps> = ({ openModal }) => {
  const [photos, setPhotos] = useState<{ id: string; title: string }[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchPhoto().then((data) => {
      setPhotos(
        data.map((photo: FetchedPhoto) => ({
          id: photo._id,
          title: photo.title,
        }))
      );
    });
  }, []);

  const addPhotoToState = (title: string) => {
    postPhoto(title).then((data) => {
      setPhotos((prevPhotos) => [
        ...prevPhotos,
        { id: data._id, title: data.title },
      ]);
    });
  };

  const deletePhotoFromState = (id: string) => {
    deletePhoto(id).then(() => {
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    });
  };
  const reorderPhotos = (from: number, to: number) => {
    const reorderedPhotos = [...photos];
    const [movedPhoto] = reorderedPhotos.splice(from, 1);
    reorderedPhotos.splice(to, 0, movedPhoto);
    setPhotos(reorderedPhotos);
  };

  const handleReorder = (event: CustomEvent) => {
    const from = event.detail.from;
    const to = event.detail.to;
    reorderPhotos(from, to);
    event.detail.complete();
  };

  return (
    <>
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            title={photo.title}
            id={photo.id}
            onDelete={() => deletePhotoFromState(photo.id)}
            onOpen={() => openModal(photo.title, photo.id)}
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
        addPhoto={addPhotoToState}
      />
    </>
  );
};

export default PhotoView;
