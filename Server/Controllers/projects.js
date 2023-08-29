import mongodb from "mongodb";
const { ObjectId } = mongodb;

export async function getProjects(req, res) {
  const db = req.db;

  try {
    const allProjects = await db.collection("Projects").find().toArray();
    console.log("All projects:", allProjects);

    res.json(allProjects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
    console.error("Error fetching projects:", error);
  }
}

export async function createProject(req, res) {
  const db = req.db;

  try {
    const project = req.body;
    await db.collection("Projects").insertOne(project);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
}

export async function deleteProject(req, res) {
  const db = req.db;

  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  console.log("DELETE /projects/" + id);
  // Delete associated tasks
  await db.collection("Tasks").deleteMany({ cardId: new ObjectId(id) });
  // Delete the project
  await db.collection("Projects").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Project deleted" });
}
