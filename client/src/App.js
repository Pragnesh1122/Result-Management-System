import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentPortal from './components/StudentPortal';
import UploadAttendance from './components/UploadAttendance';
import AddMarks from './components/AddMarks';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StudentPortal />} />
          <Route path="/upload-attendance" element={<UploadAttendance />} />
          <Route path="/add-marks" element={<AddMarks />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
