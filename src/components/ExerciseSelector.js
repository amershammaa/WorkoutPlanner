import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function ExerciseSelector({ onSelectExercise }) {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [customExercise, setCustomExercise] = useState('');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('name')
        .order('name');

      if (error) throw error;

      // Remove duplicates after fetching
      const uniqueExercises = [...new Set(data.map(e => e.name))];
      setExercises(uniqueExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleAddExercise = () => {
    if (selectedExercise) {
      onSelectExercise(selectedExercise);
      setSelectedExercise('');
    } else if (customExercise) {
      onSelectExercise(customExercise);
      setCustomExercise('');
    }
  };

  return (
    <div className="exercise-selector">
      <select
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        <option value="">Select Exercise</option>
        {exercises.map((exercise, index) => (
          <option key={index} value={exercise}>{exercise}</option>
        ))}
      </select>
      <input
        type="text"
        value={customExercise}
        onChange={(e) => setCustomExercise(e.target.value)}
        placeholder="Or enter custom exercise"
      />
      <button onClick={handleAddExercise}>Add Exercise</button>
    </div>
  );
}

export default ExerciseSelector;