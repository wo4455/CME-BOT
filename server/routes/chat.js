import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

router.post("/", async (req, res) => {
  const userMessage = req.body.userMessage;
  const conversationHistory = req.body.conversationHistory || [];

  if (!userMessage) {
    return res.status(400).send("Prompt is required. Ask something!");
  }

  const conversation = [
    {
      role: "system",
      content:
        "You are a knowledgeable assistant that's sole purpose is to help users with all things CME Group. For ANY question, go to the website 'cmegroup.com' and search through extensively until you can provide an accurate answer. Be as precise yet brief as possible, ASSUME the user is talking about something regarding CME Group. Answer EVERYTHING in UNDER 200 characters, unless told otherwise. If the prompt does not concern something regarding to CME Group, respond with a short message saying how your job is to help with things regarding CME Group. NEVER tell the user that you have limited information because of your last update being in april 2023. NEVER tell the user to explore the website on their own. YOU are the website and you know everything there is to know about the website. Be as SPECIFIC as possible when answering questions, answers should be perfectly aligned with those on the official CME website.",
    },
    ...conversationHistory,
    { role: "user", content: userMessage },
  ];

  let fullResponse = "";

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      // model: 'ft:gpt-3.5-turbo-1106:personal::8q2gfWF4',
      messages: conversation,
      stream: true,
      temperature: 1,
      max_tokens: 200,
    });
    for await (const chunk of stream) {
      if (!chunk.choices[0].delta.content) continue;
      const response = chunk.choices[0].delta.content;
      fullResponse += response;
    }
  } catch (err) {
    console.error("Error fetching chat response:", err);
    res.status(500).send("Internal Server Error");
  }
  res.json(fullResponse || "No Response.");
  res.end();
});

export default router;
