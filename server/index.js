import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

app.post('/res', async (req, res) => {
    const userMessage = req.body.userMessage;

    if (!userMessage) {
      return res.status(400).send("Prompt is required. Ask something!");
    }
  
    const conversation = [
      { role: "system", content: "You are a knowledgeable assistant that's sole purpose is to help users with all things CME Group. ANY questions that you do not have an immediate accurate answer to, go to the website 'cmegroup.com' and search through extensively until you can provide an accurate answer. Be as precise yet brief as possible. Answer EVERYTHING in 2 sentences MAX unless told otherwise. If the prompt does not concern something regarding to CME Group, respond with a short message saying how your job is to help with things regarding CME Group."},
      { role: 'user', content: userMessage },
    ]

    let fullResponse = '';

    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-4-0125-preview',
        // model: 'ft:gpt-3.5-turbo-1106:personal::8q2gfWF4',
        messages: conversation,
        stream: true,
        temperature: 1,
        max_tokens: 200
      });
      for await (const chunk of stream) {
        if (!chunk.choices[0].delta.content) continue;
        const response = chunk.choices[0].delta.content;
        fullResponse += response;
      }
    } catch(err) {
      console.error('Error fetching chat response:', err);
      res.status(500).send('Internal Server Error');
    }
    res.json(fullResponse || 'No Response.');
    res.end();
});

app.get('/ex', async (req, res) => {
  res.json("this is a test");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port} successfully.`)
});

export default openai;