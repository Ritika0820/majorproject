const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    Emp_id: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, default: "teacher" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
