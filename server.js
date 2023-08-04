import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
let db;
const app = express();
app.use(cors()); // This enables all CORS requests.
app.use(express.json());

// GET -------------------
app.get("/", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  res.send("Welcome to the homepage");
});

app.get("/tab2", (req, res) => {
  res.send("Welcome to tab2");
});

app.get("/tasks", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  res.json(allTasks);
});
app.get("/topics", async (req, res) => {
  const allCards = await db.collection("Cards").find().toArray();
  res.json(allCards);
});

//POST -------------------
app.post("/topics", async (req, res) => {
  console.log("POST /topics");
  const card = req.body;
  console.log(card);
  await db.collection("Cards").insertOne(card);
  res.json(card);
});

//Start
async function start() {
  const client = new MongoClient(
    "mongodb://root:root@localhost:27017/JournalApp?&authSource=admin"
  );
  await client.connect();
  db = client.db();
  app.listen(3001);
}
start();
