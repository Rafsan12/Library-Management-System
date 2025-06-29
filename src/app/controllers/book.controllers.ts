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

// Get All books
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = 10,
    } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    console.log(error);
  }
});
