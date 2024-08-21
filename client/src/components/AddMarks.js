// src/components/AddMarks.js
import React, { useState } from 'react';
import axios from 'axios';

const AddMarks = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    attendanceMarks: '',
    projectReviewMarks: '',
    assessmentMarks: '',
    projectSubmissionMarks: '',
    linkedInPostMarks: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/marks/add', formData);
      console.log(res.data);
      setSuccessMessage('Marks added successfully!');
      setFormData({
        studentId: '',
        attendanceMarks: '',
        projectReviewMarks: '',
        assessmentMarks: '',
        projectSubmissionMarks: '',
        linkedInPostMarks: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Marks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="Student ID"
        />
        <input
          type="number"
          name="attendanceMarks"
          value={formData.attendanceMarks}
          onChange={handleChange}
          placeholder="Attendance Marks"
        />
        <input
          type="number"
          name="projectReviewMarks"
          value={formData.projectReviewMarks}
          onChange={handleChange}
          placeholder="Project Review Marks"
        />
        <input
          type="number"
          name="assessmentMarks"
          value={formData.assessmentMarks}
          onChange={handleChange}
          placeholder="Assessment Marks"
        />
        <input
          type="number"
          name="projectSubmissionMarks"
          value={formData.projectSubmissionMarks}
          onChange={handleChange}
          placeholder="Project Submission Marks"
        />
        <input
          type="number"
          name="linkedInPostMarks"
          value={formData.linkedInPostMarks}
          onChange={handleChange}
          placeholder="LinkedIn Post Marks"
        />
        <button type="submit">Add Marks</button>
      </form>
      {successMessage && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AddMarks;
