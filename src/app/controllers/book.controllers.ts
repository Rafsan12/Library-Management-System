import express, { Request, Response } from "express";
import { Book } from "../models/books.models";
export const bookRouter = express.Router();

// Create a book

bookRouter.post("/create-book", async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});
