import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const categories = ['Push', 'Pull', 'Legs', 'Abs'];

function ExerciseLibrary() {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({ name: '', category: '' });

  useEffect(() => {
    fetchExercises();
  }, []);

  async function fetchExercises() {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('category', { ascending: true });
    if (error) console.log('Error fetching exercises:', error);
    else setExercises(data);
  }

  async function addExercise() {
    const { data, error } = await supabase
      .from('exercises')
      .insert([newExercise]);
    if (error) console.log('Error adding exercise:', error);
    else {
      setExercises([...exercises, data[0]]);
      setNewExercise({ name: '', category: '' });
    }
  }

  return (
    <div>
      <h1>Exercise Library</h1>
      <div>
        <input 
          type="text" 
          placeholder="Exercise name" 
          value={newExercise.name}
          onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
        />
        <select
          value={newExercise.category}
          onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button onClick={addExercise}>Add Exercise</button>
      </div>
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {exercises
              .filter(exercise => exercise.category === category)
              .map((exercise) => (
                <li key={exercise.id}>{exercise.name}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExerciseLibrary;