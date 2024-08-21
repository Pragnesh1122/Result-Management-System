// models/Marks.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const marksSchema = new Schema(
  {
    studentId: { type: String, required: true, unique: true },
    attendanceMarks: { type: Number, required: true },
    projectReviewMarks: { type: Number, required: true },
    assessmentMarks: { type: Number, required: true },
    projectSubmissionMarks: { type: Number, required: true },
    linkedInPostMarks: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
