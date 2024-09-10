import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/workout">Workout</Link></li>
        <li><Link to="/exercises">Exercises</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/progress">Progress</Link></li>
        <li><Link to="/goals">Goals</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;