import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import WorkoutSession from './pages/WorkoutSession';
import ExerciseLibrary from './pages/ExerciseLibrary';
import WorkoutHistory from './pages/WorkoutHistory';
import ProgressTracking from './pages/ProgressTracking';
import GoalsPlanning from './pages/GoalsPlanning';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<WorkoutSession />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/history" element={<WorkoutHistory />} />
          <Route path="/progress" element={<ProgressTracking />} />
          <Route path="/goals" element={<GoalsPlanning />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;