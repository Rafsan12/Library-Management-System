"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/api/books", book_controllers_1.bookRouter);
app.use("/api/borrow", borrow_controller_1.borrowBook);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management APP");
});
exports.default = app;
