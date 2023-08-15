import React, { useState } from "react";
import {
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { PhotoGallery } from "../../components/Hooks/PhotoGallery.js";

interface FetchedPhoto {
  _id: string;
  title: string;
}

interface PhotoViewProps {
  openModal: (title: string, id: string) => void;
}

const PhotoView: React.FC = () => {
  const { photos, takePhoto } = PhotoGallery();
  const [showActionSheet, setShowActionSheet] = useState(false);

  const openActionSheet = () => {
    setShowActionSheet(true);
  };

  const closeActionSheet = () => {
    setShowActionSheet(false);
  };

  const handleTakePhoto = async () => {
    closeActionSheet();
    await takePhoto();
  };

  const handleSelectPhoto = () => {
    // Implement the logic to select a photo from the device's gallery here
    closeActionSheet();
  };

  return (
    <div>
      <IonGrid>
        <IonRow>
          {photos.map((photo) => (
            <IonCol size="6" key={photo.filepath}>
              <IonImg src={photo.webviewPath} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonFabButton onClick={openActionSheet}>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={closeActionSheet}
        buttons={[
          {
            text: "Take Photo",
            handler: handleTakePhoto,
          },
          {
            text: "Select Photo",
            handler: handleSelectPhoto,
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ]}></IonActionSheet>
    </div>
  );
};

export default PhotoView;
