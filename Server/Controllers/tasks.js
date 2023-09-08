import mongodb from "mongodb";
const { ObjectId } = mongodb;

export async function getTasksByCardId(req, res) {
  const db = req.db;

  const cardId = req.params.cardId;
  try {
    if (!ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: "Invalid cardId" });
    }
    const tasksForCard = await db
      .collection("Tasks")
      .find({ cardId: new ObjectId(cardId) })
      .toArray();
    res.json(tasksForCard);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

export async function createTask(req, res) {
  const db = req.db;
  const { content, description, date, cardId } = req.body;
  try {
    if (!ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: "Invalid cardId" });
    }
    const task = {
      content,
      description,
      date: new Date(date),
      cardId: new ObjectId(cardId),
    };
    await db.collection("Tasks").insertOne(task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
}

// ------------------ DELETE Task ------------------
export async function deleteTask(req, res) {
  const db = req.db;
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  console.log("DELETE /tasks/" + id);
  await db.collection("Tasks").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Task deleted" });
}

// ------------------ UPDATE Task ------------------
export async function updateTask(req, res) {
  const db = req.db;
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  const updatedTask = {
    ...req.body,
    date: new Date(req.body.date),
  };
  try {
    const result = await db
      .collection("Tasks")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
}

// ------------------ GET Tasks Due Today ------------------
export async function getTasksDueToday(req, res) {
  console.log("getTasksDueToday called");

  const db = req.db;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tasksForToday = await db
    .collection("Tasks")
    .find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    })
    .toArray();
  res.json(tasksForToday);
}
