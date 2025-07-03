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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const books_models_1 = require("../models/books.models");
exports.bookRouter = express_1.default.Router();
// Create a book
exports.bookRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_models_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get all books
exports.bookRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10, } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield books_models_1.Book.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get single book by ID
exports.bookRouter.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
            });
            return;
        }
        const book = yield books_models_1.Book.findById(bookId);
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Update book
exports.bookRouter.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
            });
            return;
        }
        const book = yield books_models_1.Book.findByIdAndUpdate(bookId, req.body, {
            new: true,
            runValidators: true,
        });
        res.json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Delete book
exports.bookRouter.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!mongoose_1.default.isValidObjectId(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID",
            });
            return;
        }
        const book = yield books_models_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
            return;
        }
        res.json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}));
