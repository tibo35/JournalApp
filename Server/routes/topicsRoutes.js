import express from "express";
import { getTopics, createTopic, deleteTopic } from "../controllers/topics.js";

const router = express.Router();

router.get("/", getTopics);

router.post("/", createTopic);

router.delete("/:id", deleteTopic);

export default router;
