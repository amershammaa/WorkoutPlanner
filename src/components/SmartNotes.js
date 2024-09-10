import React from 'react';

function SmartNotes({ bodyWeight, setBodyWeight, sleepQuality, setSleepQuality, notes, setNotes }) {
  return (
    <div className="smart-notes">
      <h2>Smart Notes</h2>
      <div>
        <label>Body Weight:</label>
        <input
          type="number"
          value={bodyWeight}
          onChange={(e) => setBodyWeight(e.target.value)}
          placeholder="Body Weight (kg)"
        />
      </div>
      <div>
        <label>Sleep Quality:</label>
        <select value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)}>
          <option value="">Select Sleep Quality</option>
          <option value="Poor">Poor</option>
          <option value="Fair">Fair</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </select>
      </div>
      <div>
        <label>Additional Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes about your workout or how you're feeling"
        />
      </div>
    </div>
  );
}

export default SmartNotes;