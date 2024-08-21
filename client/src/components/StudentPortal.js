// src/components/StudentPortal.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentPortal = () => {
  const [studentId, setStudentId] = useState('');
  const [marks, setMarks] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`/api/marks/results/${studentId}`);
      setMarks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Student Portal</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter your ID"
        />
        <button type="submit">View Results</button>
      </form>
      {marks && (
        <div>
          <h3>Results</h3>
          <p>Attendance Marks: {marks.attendanceMarks}</p>
          <p>Project Review Marks: {marks.projectReviewMarks}</p>
          <p>Assessment Marks: {marks.assessmentMarks}</p>
          <p>Project Submission Marks: {marks.projectSubmissionMarks}</p>
          <p>LinkedIn Post Marks: {marks.linkedInPostMarks}</p>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
