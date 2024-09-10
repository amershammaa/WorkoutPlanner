import React, { useState } from 'react';

function ExerciseLog({ exercises, addSet }) {
  const [newSet, setNewSet] = useState({ weight: '', reps: '' });

  const handleAddSet = (exerciseId) => {
    if (newSet.weight && newSet.reps) {
      addSet(exerciseId, parseFloat(newSet.weight), parseInt(newSet.reps));
      setNewSet({ weight: '', reps: '' });
    }
  };

  return (
    <div className="exercise-log">
      <h2>Exercise Log</h2>
      {exercises.map((exercise) => (
        <div key={exercise.id} className="exercise-item">
          <h3>{exercise.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Set</th>
                <th>Weight</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {exercise.sets.map((set, index) => (
                <tr key={set.id}>
                  <td>{set.set_number}</td>
                  <td>{set.weight}</td>
                  <td>{set.reps}</td>
                </tr>
              ))}
              <tr>
                <td>{exercise.sets.length + 1}</td>
                <td>
                  <input
                    type="number"
                    value={newSet.weight}
                    onChange={(e) => setNewSet({ ...newSet, weight: e.target.value })}
                    placeholder="Weight"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newSet.reps}
                    onChange={(e) => setNewSet({ ...newSet, reps: e.target.value })}
                    placeholder="Reps"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => handleAddSet(exercise.id)}>Add Set</button>
        </div>
      ))}
    </div>
  );
}

export default ExerciseLog;