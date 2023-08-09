import mongodb from "mongodb";
const { MongoClient, ObjectId } = mongodb;
import express from "express";
import cors from "cors";
import { secretKey } from "./src/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());
let db;

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Check if user already exists
    const user = await db.collection("users").findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = { email, password: hashedPassword };
    await db.collection("users").insertOne(newUser);

    // Generate and return JWT
    const token = jwt.sign({ _id: newUser._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    console.log(error); // log the error
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate and return JWT
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET ---------------------------------------------
app.get("/tab2", (req, res) => {
  res.send("Welcome to tab2");
});

app.get("/tasks/:cardId", async (req, res) => {
  // Filter tasks by cardId
  const cardId = req.params.cardId;
  if (!ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: "Invalid cardId" });
  }
  const tasksForCard = await db
    .collection("Tasks")
    .find({ cardId: new ObjectId(cardId) })
    .toArray();
  res.json(tasksForCard);
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
  const { content, dueDate, cardId } = req.body; // Extract the cardId from the body
  if (!ObjectId.isValid(cardId)) {
    return res.status(400).json({ message: "Invalid cardId" });
  }
  const task = { content, dueDate, cardId: new ObjectId(cardId) }; // Store the cardId in each task
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
    "mongodb+srv://tibo:Journalapp@cluster-journal-app.m4f8z2w.mongodb.net/?retryWrites=true&w=majority",
    {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    }
  );

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    db = client.db();
    app.listen(3001);
  } catch (error) {
    console.error(error);
  }
}

start();
