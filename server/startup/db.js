import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

export default async function() {
    if (!uri) throw new Error('No MongoDB URI found.');

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log("Error connecting to MongoDB.", err);
    };
};