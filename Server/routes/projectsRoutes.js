import express from "express";
import mongodb from "mongodb";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/projects.js";

const { ObjectId } = mongodb;
const router = express.Router();

// ---------------------------------------------GET ------------
router.get("/", getProjects);

// --------------------------------------------POST--------------
router.post("/", createProject);

// ---------------------------------------------DELETE-------------------
router.delete("/:id", deleteProject);

export default router;
