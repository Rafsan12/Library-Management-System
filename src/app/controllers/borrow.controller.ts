import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/books.models";
import { Borrow } from "../models/borrow.model";
export const borrowBook = express.Router();

// create borrow
borrowBook.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;
      const book = await Book.findById(bookId);

      if (!mongoose.isValidObjectId(bookId)) {
        res.status(400).json({
          success: false,
          message: "Invalid book ID",
        });
        return;
      }

      if (!book) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
        return;
      }

      if (book.copies < quantity) {
        res.status(400).json({
          success: false,
          message: "Not enough copies available",
        });
        return;
      }

      book.copies -= quantity;
      book.updateAvailability();
      await book.save();

      const borrowRecord = await Borrow.create({
        book: bookId,
        quantity,
        dueDate,
      });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    } catch (error) {
      next(error);
    }
  }
);
borrowBook.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        { $unwind: "$bookDetails" },
        {
          $project: {
            book: {
              title: "$bookDetails.title",
              isbn: "$bookDetails.isbn",
            },
            totalQuantity: 1,
          },
        },
      ]);

      res.json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (err) {
      next(err);
    }
  }
);
