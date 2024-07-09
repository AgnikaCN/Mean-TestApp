const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const itemSchema = new Schema({
  name: String,
  designation: String,
  yoe: Number,
  location: String,
});
