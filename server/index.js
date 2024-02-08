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

app.get('/res', async (req, res) => {
    const userMessage = req.body.userMessage;

    const conversation = [
      { role: 'user', content: userMessage }
    ]

    try {
      const stream = await openai.chat.completions.create({
        // model: 'gpt-4-0125-preview',
        model: 'ft:gpt-3.5-turbo-1106:personal::8q2gfWF4',
        messages: conversation,
        stream: true,
        temperature: 1,
        max_tokens: 200
      });
      for await (const chunk of stream) {
        if (!chunk.choices[0].delta.content) continue;
        const response = chunk.choices[0].delta.content;
        process.stdout.write(response || 'No Response.');
      }
    } catch(err) {
      console.error('Error fetching chat response:', err);
      res.status(500).send('Internal Server Error');
    }
    
    res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port} successfully.`)
});

export default openai;