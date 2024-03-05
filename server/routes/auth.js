import express from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Joi from 'joi';
import { User } from '../Models/User.js';

const router = express.Router();

// Logging in a user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Make sure there is a user with the username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid username or password");

    // Validating password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username or password");

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send('Login Successful');  
});

function validate(req) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
        savedChats: Joi.array()
    });

    return schema.validate(req);
}

export default router;