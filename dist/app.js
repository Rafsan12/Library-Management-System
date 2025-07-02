// api/app.ts
import express from "express";
import mongoose from "mongoose";
import { bookRouter } from "../src/app/controllers/book.controllers";
const app = express();
app.use(express.json());
app.use("/api/books", bookRouter);
let isConnected = false;
async function connectToDB() {
    if (isConnected)
        return;
    await mongoose.connect("mongodb+srv://Library:OcZ9SZJHVwofI5uE@cluster0.bytzc92.mongodb.net/LM-app?retryWrites=true&w=majority&appName=Cluster0");
    isConnected = true;
}
export default async function handler(req, res) {
    await connectToDB();
    return app(req, res);
}
