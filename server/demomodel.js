// model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: String,
    designation: String,
    yoe: Number,
    location: String,
  },
  { collection: "EmployeeCollection" }
);

const Item = mongoose.model("Item", employeeSchema);

export default Item;
