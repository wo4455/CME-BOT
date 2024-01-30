const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.json());

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

app.get('/res', async (req, res) => {
    const userMessage = req.body.userMessage;

    const conversation = [
      { role: 'system', content: 'You are a helpful assistant regarding navigation the company called CME Group, navigating their online webiste, and giving any information on what, how, why, and when they do what they do. Anything relating to CME Group at all. Any questions pertaining to the website or any other information will require you to navigate to the CME Group website and find exactly the answer based on the most up-to-date information you have.'},
      { role: 'user', content: userMessage }
    ]

    try {
      const stream = await openai.chat.completions.create({
        model: 'gpt-4-0125-preview', // gpt-3.5-turbo-1106
        messages: conversation,
        stream: true,
        temperature: 1,
        max_tokens: 16
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