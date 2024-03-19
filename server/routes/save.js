import express from "express";
import { User } from "../Models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const chatsToSave = req.body.chatsToSave;

    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).send("User not found");

    user.savedChats = chatsToSave;
    await user.save();

    res.status(200).send("Chats saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
