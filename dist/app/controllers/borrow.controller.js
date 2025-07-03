"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const books_models_1 = require("../models/books.models");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowBook = express_1.default.Router();
// create borrow
exports.borrowBook.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield books_models_1.Book.findById(bookId);
        if (!mongoose_1.default.isValidObjectId(bookId)) {
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
        yield book.save();
        const borrowRecord = yield borrow_model_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        next(error);
    }
}));
