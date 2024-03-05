import fs from 'fs';
import openai from '../index.js';

const upload = async () => {
    try {
        const response = await openai.files.create({ 
            file: fs.createReadStream('./data/cme.jsonl'), 
            purpose: 'fine-tune' 
        });
        console.log(`File ID: ${response.id}`);
    } catch (err) {
        console.log("Error: ", err);
    };
};

upload();
