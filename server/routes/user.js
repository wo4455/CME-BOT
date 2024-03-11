import express from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { User, validateUser, validatePassword } from '../Models/User.js';

const router = express.Router();

// Registering a new user
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    const { invalid } = validatePassword(req.body.password);
    if (invalid) return res.status(400).send(invalid.message);

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        username: req.body.username,
        password: req.body.password
    });

    const salt = bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, parseInt(salt));

    await user.save();

    const token = user.generateAuthToken();
    res.setHeader('Access-Control-Expose-Headers', 'X-Auth-Token');
    res.setHeader('X-Auth-Token', token).send(_.pick(user, [ '_id', 'username' ]));
});

export default router;