import { MongoClient } from "mongodb";
import { MONGO_URI } from "../config";

let db;

export async function connectDB() {
  const client = new MongoClient(MONGO_URI, {});
  await client.connect();
  db = client.db();
  return db;
}

export function getDB() {
  return db;
}
