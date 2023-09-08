import express from "express";
import { getAllPhotos, addPhoto, deletePhoto } from "../controllers/photos.js";

const router = express.Router();

// ---------------------------------------------GET ------------
router.get("/PhotoOfTheDay", getAllPhotos);

// --------------------------------------------POST--------------
router.post("/PhotoOfTheDay", addPhoto);

// ---------------------------------------------DELETE-------------------
router.delete("/PhotoOfTheDay/:id", deletePhoto);

export default router;
