import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

let server;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://Library:OcZ9SZJHVwofI5uE@cluster0.bytzc92.mongodb.net/LM-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    // console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
