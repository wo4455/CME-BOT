import express from 'express';
import auth from '../middleware/auth.js';
import { User } from '../Models/User.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const username = req.body.username;
        const { savedChats } = req.body.savedChats;

        const user = await User.findOne(username);
        if (!user) return res.status(404).send('User not found');

        await User.findByIdAndUpdate({ username: username }, { savedChats: savedChats });
        res.status(200).send('Chats saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    };
});

export default router;