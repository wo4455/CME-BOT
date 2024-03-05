// Import required modules
import express from 'express';
import { User } from '../Models/User.js';

const router = express.Router();

router.delete('/', async (req, res) => {
    const username = req.body.username;

    try {
        const user = await User.findOne(username);

        if (!user) return res.status(404).send('User not found');

        await User.findOneAndDelete(username);

        return res.status(200).send('User account deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send('Internal server error');
    };
});

export default router;