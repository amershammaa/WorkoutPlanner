import React, { useState, useEffect } from 'react';
import  supabase  from '../supabaseClient';
import { Line } from 'react-chartjs-2';

function ProgressTracking() {
  const [bodyWeightData, setBodyWeightData] = useState({});
  const [exerciseProgressData, setExerciseProgressData] = useState({});

  useEffect(() => {
    fetchBodyWeightData();
    fetchExerciseProgressData();
  }, []);

  async function fetchBodyWeightData() {
    const { data, error } = await supabase
      .from('workouts')
      .select('date, body_weight')
      .order('date', { ascending: true });
    
    if (error) console.error('Error fetching body weight data:', error);
    else {
      setBodyWeightData({
        labels: data.map(entry => new Date(entry.date).toLocaleDateString()),
        datasets: [{
          label: 'Body Weight (kg)',
          data: data.map(entry => entry.body_weight),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      });
    }
  }

  async function fetchExerciseProgressData() {
    // This is a simplified example. You might want to select a specific exercise or implement exercise selection.
    const { data, error } = await supabase
      .from('sets')
      .select('*, exercises(name)')
      .order('created_at', { ascending: true });
    
    if (error) console.error('Error fetching exercise progress data:', error);
    else {
      // Group by exercise and create datasets
      const exerciseData = data.reduce((acc, set) => {
        if (!acc[set.exercises.name]) {
          acc[set.exercises.name] = [];
        }
        acc[set.exercises.name].push({ x: new Date(set.created_at), y: set.weight });
        return acc;
      }, {});

      setExerciseProgressData({
        datasets: Object.entries(exerciseData).map(([name, data]) => ({
          label: name,
          data: data,
          fill: false,
          borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          tension: 0.1
        }))
      });
    }
  }

  return (
    <div className="progress-tracking">
      <h1>Progress Tracking</h1>
      <section>
        <h2>Body Weight Progress</h2>
        {bodyWeightData.labels && <Line data={bodyWeightData} />}
      </section>
      <section>
        <h2>Exercise Progress</h2>
        {exerciseProgressData.datasets && <Line data={exerciseProgressData} options={{scales: {x: {type: 'time'}}}} />}
      </section>
    </div>
  );
}

export default ProgressTracking;