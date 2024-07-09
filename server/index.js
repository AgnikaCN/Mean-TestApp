import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./demomodel.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

// connect with MongoDB using Express
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })

  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  });

// GET request for employees
app.get("/employees", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});
