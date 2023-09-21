import express from "express";
import {
  getTasksByCardId,
  createTask,
  deleteTask,
  updateTask,
  getTasksDueToday,
} from "../controllers/tasks.js";

const router = express.Router();

// ---------------------------------------------GET ------------
router.get("/due-today", getTasksDueToday);
router.get("/:cardId", getTasksByCardId);

// --------------------------------------------POST--------------
router.post("/", createTask);

// ---------------------------------------------DELETE-------------------
router.delete("/:id", deleteTask);

// --------------------------------------------PUT--------------
router.put("/:id", updateTask);

export default router;
