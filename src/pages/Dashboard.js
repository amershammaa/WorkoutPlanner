import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function Dashboard() {
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [upcomingGoals, setUpcomingGoals] = useState([]);

  useEffect(() => {
    fetchRecentWorkouts();
    fetchUpcomingGoals();
  }, []);

  async function fetchRecentWorkouts() {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .order('date', { ascending: false })
      .limit(5);
    
    if (error) console.error('Error fetching recent workouts:', error);
    else setRecentWorkouts(data);
  }

  async function fetchUpcomingGoals() {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .gt('target_date', new Date().toISOString())
      .order('target_date', { ascending: true })
      .limit(3);
    
    if (error) console.error('Error fetching upcoming goals:', error);
    else setUpcomingGoals(data);
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <section>
        <h2>Recent Workouts</h2>
        <ul>
          {recentWorkouts.map(workout => (
            <li key={workout.id}>{workout.name} - {new Date(workout.date).toLocaleDateString()}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Upcoming Goals</h2>
        <ul>
          {upcomingGoals.map(goal => (
            <li key={goal.id}>{goal.description} - Due: {new Date(goal.target_date).toLocaleDateString()}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;