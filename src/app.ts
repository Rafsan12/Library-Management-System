import cors from "cors";
import express, { Application, Request, Response } from "express";
import { bookRouter } from "./app/controllers/book.controllers";
import { borrowBook } from "./app/controllers/borrow.controller";

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowBook);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management APP");
});

export default app;
