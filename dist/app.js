import cors from "cors";
import express from "express";
import { bookRouter } from "./app/controllers/book.controllers";
const app = express();
// middleware
app.use(express.json());
app.use(cors());
// routes
app.use("/api/books", bookRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management APP");
});
export default app;
