import mongodb from "mongodb";
const { ObjectId } = mongodb;

// ------------------ GET PhotoOfTheDay ------------------
export async function getAllPhotos(req, res) {
  const allPhotos = await db.collection("PhotoOfTheDay").find().toArray();
  res.json(allPhotos);
}

// ------------------ POST PhotoOfTheDay ------------------
export async function addPhoto(req, res) {
  const photoOfTheDay = req.body;
  await db.collection("PhotoOfTheDay").insertOne(photoOfTheDay);
  res.json(photoOfTheDay);
}

// ------------------ DELETE PhotoOfTheDay ------------------
export async function deletePhoto(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  console.log("DELETE /PhotoOfTheDay/" + id);
  await db.collection("PhotoOfTheDay").deleteOne({ _id: new ObjectId(id) });
  res.json({ message: "Photo deleted" });
}
