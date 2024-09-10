import React, { useState, useEffect } from 'react';
import  supabase  from '../supabaseClient';

function GoalsPlanning() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ description: '', target_date: '' });

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('target_date', { ascending: true });
    
    if (error) console.error('Error fetching goals:', error);
    else setGoals(data);
  }

  async function addGoal() {
    const { data, error } = await supabase
      .from('goals')
      .insert([newGoal]);
    
    if (error) console.error('Error adding goal:', error);
    else {
      setGoals([...goals, data[0]]);
      setNewGoal({ description: '', target_date: '' });
    }
  }

  async function toggleGoalCompletion(id, completed) {
    const { error } = await supabase
      .from('goals')
      .update({ completed: !completed })
      .eq('id', id);
    
    if (error) console.error('Error updating goal:', error);
    else {
      setGoals(goals.map(goal => 
        goal.id === id ? { ...goal, completed: !completed } : goal
      ));
    }
  }

  return (
    <div className="goals-planning">
      <h1>Goals Planning</h1>
      <div>
        <input 
          type="text" 
          placeholder="Goal description" 
          value={newGoal.description}
          onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
        />
        <input 
          type="date" 
          value={newGoal.target_date}
          onChange={(e) => setNewGoal({...newGoal, target_date: e.target.value})}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <input 
              type="checkbox" 
              checked={goal.completed} 
              onChange={() => toggleGoalCompletion(goal.id, goal.completed)}
            />
            {goal.description} - Due: {new Date(goal.target_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalsPlanning;