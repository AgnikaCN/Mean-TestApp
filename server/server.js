const express = require("express");
// const mongoose = require("mongoose");
const Item = require("./model");

const app = express();
const port = 3000;

app.use(express.json());

// CONNECT TO MONGODB

mongoose.connect("mongodb://localhost:27017/employee");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// const API_URL = "https://jsonplaceholder.typicode.com";

// GET request for posts
app.get("/posts", async (req, res) => {
  try {
    const resp = await axios.get("`${API_URL}/posts");

    res.json(resp.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// GET request for employees
app.get("/employees", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).send(items);
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

//UPDATE request for employees
app.patch("/employees/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, item) => {
        if (error) {
          return res.status(500).send(error);
        }
        if (!item) {
          return res.status(404).send();
        }
        res.send(item);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// start server
app.listen(port, () => {
  console.log("Server running at http://localhost:${port}/");
});
