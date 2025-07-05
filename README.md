# Library Management System API
A robust backend API for a Library Management System, built with Node.js, Express, TypeScript, and MongoDB. This API provides endpoints to manage library operations, including creating, reading, updating, and deleting book records. It is designed to integrate seamlessly with a frontend application (e.g., a React app using Redux for state management) to provide a complete library management solution. The API is type-safe, scalable, and follows RESTful principles.
Features

RESTful API: Endpoints for managing books (CRUD operations: Create, Read, Update, Delete).
Type-Safe Development: Built with TypeScript for enhanced type safety and maintainability.
Database Integration: Uses MongoDB with Mongoose for efficient data storage and retrieval.
Error Handling: Robust error handling for invalid requests, missing data, or server issues.
Scalable Architecture: Modular code structure for easy extension and maintenance.
Frontend Integration: Designed to work with a frontend application using Redux for state management (e.g., a React app for adding/editing books).
Environment Configuration: Supports environment variables for secure configuration (e.g., MongoDB connection).

Tech Stack

Backend: Node.js, Express, TypeScript
Database: MongoDB with Mongoose
State Management: Supports integration with Redux on the frontend
Other Dependencies: dotenv (for environment variables), cors (for cross-origin requests)

Prerequisites
Ensure the following are installed before setting up the project:

Node.js: Version 16.x or higher
npm: Version 7.x or higher (or Yarn/pnpm if preferred)
MongoDB: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas)
Git: For cloning the repository

Installation

Clone the Repository:
git clone https://github.com/Rafsan12/Library-Management-System.git
cd Library-Management-System


Install Dependencies:
npm install

This installs Express, TypeScript, Mongoose, and other dependencies listed in package.json.

Set Up Environment Variables:

Create a .env file in the root directory.
Add the following variables:PORT=5000
MONGODB_URI=mongodb://localhost:27017/library-management


Replace MONGODB_URI with your MongoDB connection string (e.g., MongoDB Atlas URI).


Run the Development Server:
npm run dev

The API will start on http://localhost:5000 (or the port specified in .env).

Build for Production:
npm run build

Production-ready files will be generated in the dist folder.

Start the Production Server:
npm start



API Endpoints
The API provides the following RESTful endpoints for managing books:



Method
Endpoint
Description
Request Body (JSON) Example



GET
/api/books
Retrieve all books
N/A


GET
/api/books/:id
Retrieve a book by ID
N/A


POST
/api/books
Create a new book
{ "title": "Book Title", "author": "Author Name", "genre": "FICTION", "isbn": "1234567890123", "description": "Book description", "copies": 1, "available": true }


PUT
/api/books/:id
Update a book by ID
{ "title": "Updated Title", "author": "Updated Author", "genre": "SCIENCE", "isbn": "1234567890123", "description": "Updated description", "copies": 2, "available": false }


DELETE
/api/books/:id
Delete a book by ID
N/A


Example Request (POST)
curl -X POST http://localhost:5000/api/books \
-H "Content-Type: application/json" \
-d '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","genre":"FICTION","isbn":"9780743273565","description":"A classic novel","copies":3,"available":true}'

Example Response
{
  "id": "1234567890abcdef",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "FICTION",
  "isbn": "9780743273565",
  "description": "A classic novel",
  "copies": 3,
  "available": true
}

Project Structure
Library-Management-System/
├── src/
│   ├── controllers/
│   │   ├── bookController.ts  # Handles book-related API logic
│   ├── models/
│   │   ├── bookModel.ts      # Mongoose schema for books
│   ├── routes/
│   │   ├── bookRoutes.ts     # Express routes for book endpoints
│   ├── interfaces/
│   │   ├── book.ts           # TypeScript interfaces for Book data
│   ├── middleware/
│   │   ├── errorHandler.ts   # Custom error handling middleware
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── README.md                # Project documentation

Available Scripts

npm run dev: Starts the development server with hot reloading (using ts-node-dev or nodemon).
npm run build: Compiles TypeScript to JavaScript for production.
npm start: Runs the compiled JavaScript in production.
npm run lint: Runs ESLint for code linting (if configured).
npm run format: Runs Prettier for code formatting (if configured).

Frontend Integration
This API is designed to work with a frontend application, such as a React app using Redux for state management. To integrate:

Connect to API: Use fetch or libraries like axios in your React app to make HTTP requests to the API endpoints (e.g., http://localhost:5000/api/books).
Redux Setup: Store book data in a Redux slice (e.g., bookSlice.ts) and dispatch actions to fetch or update books.
Example Frontend: A React frontend with components like BookForm.tsx (for adding/editing books) and Loading.tsx (for displaying a spinning book animation during API calls) can be paired with this API. Ensure the frontend handles the API's JSON responses correctly.

Example Redux Integration
// In your frontend (e.g., bookSlice.ts)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('http://localhost:5000/api/books');
  return response.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: { books: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
  },
});

Troubleshooting

MongoDB Connection Error: If you encounter a MongooseError: The uri parameter to openUri() must be a string, got 'undefined', verify your MONGODB_URI in the .env file and ensure the MongoDB server is running. Check for typos (e.g., DB_URl vs. DB_URL).
CORS Issues: Ensure the API allows requests from your frontend's origin by configuring cors in app.ts.
TypeScript Errors: Run npm run lint to catch type issues and ensure your Book interface matches the API's data structure.

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit: git commit -m "Add your feature".
Push to the branch: git push origin feature/your-feature-name.
Open a pull request with a detailed description of your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or feedback, reach out to the project maintainer:

GitHub: Rafsan12


Built with ❤️ by Rafsan12
