const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const uri =
  "mongodb+srv://admin:GGtVzRdYj2bucQ3o@dropease.itfjgle.mongodb.net/?retryWrites=true&w=majority&appName=dropease";
// Serve the React frontend as static files
app.use(express.static(path.join(__dirname, "public")));

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

// Start the Express server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
