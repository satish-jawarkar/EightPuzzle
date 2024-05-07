// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css'; // Assuming you have the CSS file in the same directory
import EightPuzzleLandingPage from './EightPuzzleLandingPage';
import EightPuzzleSolver from './EightPuzzleSolver';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EightPuzzleLandingPage />} />
          <Route path="/solver" element={<EightPuzzleSolver />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
