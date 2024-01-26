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
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'What are the best countries to travel to?' }],
        stream: true,
      });
      for await (const chunk of stream) {
        if (!chunk.choices[0].delta.content) continue;
        const response = chunk.choices[0].delta.content;
        process.stdout.write(response || 'No Response.');
      }
      res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port} successfully.`)
});