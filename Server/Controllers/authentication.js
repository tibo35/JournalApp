import mongodb from "mongodb";
const { ObjectId } = mongodb;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export async function signup(req, res) {
  const db = req.db;

  try {
    const { name, email, username, password } = req.body;

    // Check if user already exists
    const user = await db.collection("users").findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with name and username fields
    const newUser = { name, email, username, password: hashedPassword };
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
}

export async function login(req, res) {
  const db = req.db;

  try {
    const { username, password } = req.body;

    // Find user by either username or email
    const user = await db
      .collection("users")
      .findOne({ $or: [{ email: username }, { username: username }] });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }

    // Check password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res
        .status(400)
        .json({ message: "Invalid username/email or password" });
    }

    // Generate and return JWT
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
