import mongodb from "mongodb";
const { MongoClient, ObjectId } = mongodb;
import express from "express";
import cors from "cors";
let db;
const app = express();
app.use(cors());
app.use(express.json());

// GET -------------------
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
  const card = req.body;
  await db.collection("Cards").insertOne(card);
  res.json(card);
});
app.post("/tasks", async (req, res) => {
  const task = req.body;
  await db.collection("Tasks").insertOne(task);
  res.json(task);
});

//DELETE --------------
app.delete("/topics/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  console.log("DELETE /topics/" + id);
  await db.collection("Cards").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Deleted" });
});

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  console.log("DELETE /tasks/" + id);
  await db.collection("Tasks").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Task deleted" });
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
