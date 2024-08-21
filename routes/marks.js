// routes/marks.js
const router = require('express').Router();
const Marks = require('../models/Marks');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/upload/attendance', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.forEach((row) => {
        const { studentId, attendanceMarks } = row;

        Marks.findOneAndUpdate(
          { studentId },
          { attendanceMarks },
          { new: true, upsert: true },
          (err, updatedMarks) => {
            if (err) return res.status(400).json('Error: ' + err);
          }
        );
      });
      fs.unlinkSync(filePath); // Delete the uploaded file
      res.json('Attendance marks updated!');
    });
});

router.get('/results/:studentId', (req, res) => {
  Marks.findOne({ studentId: req.params.studentId }, (err, marks) => {
    if (err) return res.status(400).json('Error: ' + err);
    if (!marks) return res.status(404).json('Student not found');
    res.json(marks);
  });
});

// Route to add new student marks
router.post('/add', (req, res) => {
  const newMarks = new Marks({
    studentId: req.body.studentId,
    attendanceMarks: req.body.attendanceMarks,
    projectReviewMarks: req.body.projectReviewMarks,
    assessmentMarks: req.body.assessmentMarks,
    projectSubmissionMarks: req.body.projectSubmissionMarks,
    linkedInPostMarks: req.body.linkedInPostMarks,
  });

  newMarks.save()
    .then(() => res.json('Marks added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
