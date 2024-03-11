import express from 'express';
import { User } from '../Models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;

        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).send('User not found');

        const savedChats = user.savedChats;
        res.status(200).json(savedChats);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error', err);
    };
});

export default router;