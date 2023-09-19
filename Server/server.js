import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { MONGO_URI, PORT } from "../Server/config/index.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/tasksRoutes.js";
import projectRoutes from "./routes/projectsRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import topicsRoutes from "./routes/topicsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

let db;

async function start() {
  const client = new MongoClient(MONGO_URI, {
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    db = client.db();

    // Use middleware to attach db to req
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Now setup your routes
    app.use("/users", userRoutes);
    app.use("/tasks", taskRoutes);
    app.use("/projects", projectRoutes);
    app.use("/photos", photoRoutes);
    app.use("/topics", topicsRoutes);

    app.listen(3001);
  } catch (error) {
    console.error(error);
  }
}

start();
