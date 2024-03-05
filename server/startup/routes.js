import express from 'express';
import userRoute from '../routes/user.js';
import authRoute  from '../routes/auth.js';
import error from '../middleware/error.js';
import deleteRoute from '../routes/delete.js';
import cookieParser from "cookie-parser";
import saveChatsRoute from '../routes/save.js';

export default function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.use('/new', userRoute);
    app.use('/auth', authRoute);
    app.use('/delete', deleteRoute);
    app.use('/save', saveChatsRoute);
    
    app.use(error); // must be last
};