import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./demomodel.js";

const app = express();
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;

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
    process.exit(1);
  });

// CUSTOM MIDDLEWARE
const logger = function (req, res, next) {
  console.log(logger);
  next();
};
app.use(logger);

const requestTime = function (req, res, next) {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
};
app.use(requestTime);

// GET request for employees
app.get("/employees", async (req, res) => {
  try {
    const items = await Item.find();
    // console.log("items:", items);

    res.status(200).json({
      status: "Success",
      requestedAt: req.requestTime,
      data: items,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST request for employees
app.post("/employees", async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save(); //save to DB
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});
