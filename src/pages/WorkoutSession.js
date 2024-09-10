import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../supabaseClient';
import ExerciseLog from '../components/ExerciseLog';
import WorkoutTimer from '../components/WorkoutTimer';
import RestTimer from '../components/RestTimer';
import SmartNotes from '../components/SmartNotes';

function WorkoutSession() {
  const [workoutId, setWorkoutId] = useState(null);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyWeight, setBodyWeight] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customExercise, setCustomExercise] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');

  useEffect(() => {
    const initWorkout = async () => {
      await createNewWorkout();
    };
    initWorkout();
  }, []);

  const createNewWorkout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const { data, error } = await supabase
        .from('workouts')
        .insert({
          id: uuidv4(),
          user_id: user.id,
          name: 'New Workout',
          date: new Date().toISOString().split('T')[0],
          type: '',
        })
        .single();

      if (error) throw error;

      setWorkoutId(data.id);
      setWorkoutName(data.name);
      setWorkoutDate(data.date);
    } catch (err) {
      console.error('Error creating workout:', err);
      setError('Failed to create a new workout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addExercise = async (exerciseName, category) => {
    setError(null);
    try {
      const newExercise = {
        id: uuidv4(),
        workout_id: workoutId,
        name: exerciseName,
        category: category,
        sets: [],
      };

      const { data, error } = await supabase
        .from('exercises')
        .insert(newExercise)
        .single();

      if (error) throw error;

      setExercises([...exercises, data]);
    } catch (err) {
      console.error('Error adding exercise:', err);
      setError('Failed to add exercise. Please try again.');
    }
  };

  const addSet = async (exerciseId, setNumber, weight, reps) => {
    setError(null);
    try {
      const newSet = {
        id: uuidv4(),
        exercise_id: exerciseId,
        set_number: setNumber,
        weight: weight,
        reps: reps,
      };

      const { data, error } = await supabase
        .from('sets')
        .insert(newSet)
        .single();

      if (error) throw error;

      setExercises(exercises.map(exercise => 
        exercise.id === exerciseId 
          ? { ...exercise, sets: [...exercise.sets, data] }
          : exercise
      ));
    } catch (err) {
      console.error('Error adding set:', err);
      setError('Failed to add set. Please try again.');
    }
  };

  const saveWorkout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from('workouts')
        .update({
          name: workoutName,
          date: workoutDate,
          type: workoutType,
          body_weight: bodyWeight,
          sleep_quality: sleepQuality,
          notes: notes,
        })
        .eq('id', workoutId);

      if (error) throw error;

      console.log('Workout saved successfully');
    } catch (err) {
      console.error('Error saving workout:', err);
      setError('Failed to save workout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-session">
      <h1>Workout Session</h1>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        placeholder="Workout Name"
      />
      <input
        type="date"
        value={workoutDate}
        onChange={(e) => setWorkoutDate(e.target.value)}
      />
      <select
        value={workoutType}
        onChange={(e) => setWorkoutType(e.target.value)}
      >
        <option value="">Select Workout Type</option>
        <option value="Push">Push</option>
        <option value="Pull">Pull</option>
        <option value="Legs">Legs</option>
      </select>
      <WorkoutTimer />
      <RestTimer />
      <div>
        <select 
          value={selectedExercise} 
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          <option value="">Select Exercise</option>
          <option value="Bench Press">Bench Press</option>
          <option value="Squats">Squats</option>
          <option value="Deadlifts">Deadlifts</option>
        </select>
        <input
          type="text"
          value={customExercise}
          onChange={(e) => setCustomExercise(e.target.value)}
          placeholder="Or enter custom exercise"
        />
        <button onClick={() => {
          const exerciseToAdd = selectedExercise || customExercise;
          if (exerciseToAdd) {
            addExercise(exerciseToAdd, workoutType);
            setSelectedExercise('');
            setCustomExercise('');
          }
        }}>
          Add Exercise
        </button>
      </div>
      <ExerciseLog 
        exercises={exercises} 
        addSet={addSet}
      />
      <SmartNotes
        bodyWeight={bodyWeight}
        setBodyWeight={setBodyWeight}
        sleepQuality={sleepQuality}
        setSleepQuality={setSleepQuality}
        notes={notes}
        setNotes={setNotes}
      />
      <button onClick={saveWorkout}>Save Workout</button>
    </div>
  );
}

export default WorkoutSession;