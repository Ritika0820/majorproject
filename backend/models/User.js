const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true },
    name: { 
        type: String, 
        required: true, 
        trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true },
    password: { 
        type: String, 
        required: true },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    // student-only fields
    branch: { type: String },
    year: { type: Number },
    CRN: { type: String },
  },
  { timestamps: true }
);


const User = mongoose.model("User" , UserSchema);
module.exports = User;

