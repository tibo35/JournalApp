import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = Date.now() + ".jpeg";
    const savedFileImage = {
      filepath: fileName,
      webviewPath: photo.webPath,
    };

    setPhotos([savedFileImage, ...photos]);
  };

  return {
    photos,
    takePhoto,
  };
};
