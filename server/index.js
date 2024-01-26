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

// app.post('/test', async (req, res) => { // doesnt work 
//     const fakePrompt = req.body.prompt;
//     res.send("Fake Prompt: " + fakePrompt);
// });

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });

    // const completion = await openai.createCompletion({
    //     model: 'gpt-3.5-turbo-1106',
    //     max_tokens: 512,
    //     temperature: 0,
    //     // moderations:true,
    //     prompt: prompt,
    // });

    for await (const chunk of stream) {
        res.send(chunk.choices[0]?.delta?.content || 'No Response.');
      }
});

app.get('/res', async (req, res) => {
    const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'Say this is a test' }],
        stream: true,
      });
      for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || 'No Response.');
      }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port} successfully.`)
});