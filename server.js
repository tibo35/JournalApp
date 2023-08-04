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

//DELETE --------------
app.delete("/topics/:id", async (req, res) => {
  const id = new mongodb.ObjectId(req.params.id);
  console.log("DELETE /topics/" + id);
  await db.collection("Cards").deleteOne({ _id: new mongodb.ObjectId(id) });
  res.json({ message: "Deleted" });
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
