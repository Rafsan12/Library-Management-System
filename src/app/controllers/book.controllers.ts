import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/books.models";

export const bookRouter = express.Router();

// Create a book
bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get all books
bookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
    next(error);
  }
});

// Get single book by ID
bookRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bookId } = req.params;
      if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid book ID",
        });
      }
      const book = await Book.findById(bookId);

      res.json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update book -
bookRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bookId } = req.params;

      if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid book ID",
        });
      }

      const book = await Book.findByIdAndUpdate(bookId, req.body, {
        new: true,
        runValidators: true,
      });

      res.json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete book
bookRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { bookId } = req.params;

      if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid book ID",
        });
      }

      const book = await Book.findByIdAndDelete(bookId);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
