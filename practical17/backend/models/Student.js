// backend/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  course: { type: String, required: true },
});

export default mongoose.model("Student", studentSchema);
