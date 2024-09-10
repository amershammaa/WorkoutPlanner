import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    const { data, error } = await supabase
      .from('workouts')
      .select('*, exercises(id, name, category)')
      .order('date', { ascending: false });
    
    if (error) console.error('Error fetching workouts:', error);
    else setWorkouts(data);
  }

  return (
    <div className="workout-history">
      <h1>Workout History</h1>
      {workouts.map(workout => (
        <div key={workout.id} className="workout-entry">
          <h2>{workout.name} - {new Date(workout.date).toLocaleDateString()}</h2>
          <p>Type: {workout.type}</p>
          <p>Body Weight: {workout.body_weight} kg</p>
          <p>Sleep Quality: {workout.sleep_quality}</p>
          <h3>Exercises:</h3>
          <ul>
            {workout.exercises.map(exercise => (
              <li key={exercise.id}>{exercise.name} - {exercise.category}</li>
            ))}
          </ul>
          <p>Notes: {workout.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default WorkoutHistory;