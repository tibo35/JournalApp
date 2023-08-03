import { MongoClient } from "mongodb";
import express from "express";

let db;
const app = express();

app.get("/", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  console.log(allTasks);
  res.send("Welcome to the homepage");
});

app.get("/tab2", (req, res) => {
  res.send("Welcome to tab2");
});

// tests
app.get("/tasks", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  res.json(allTasks);
});
app.get("/topics", async (req, res) => {
  const allCards = await db.collection("Cards").find().toArray();
  res.json(allCards);
});

async function start() {
  const client = new MongoClient(
    "mongodb://root:root@localhost:27017/JournalApp?&authSource=admin"
  ); // =admin ou tab2 ????
  await client.connect();
  db = client.db();
  app.listen(3001);
}
start();
