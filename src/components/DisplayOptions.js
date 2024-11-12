import React from 'react';
import '../styles/DisplayOptions.css';


function DisplayOptions({ setGrouping, setOrdering }) {
  return (
    <div className="display-options">
      {/* Grouping selection dropdown */}
      <label>
        
        <h3>Grouping</h3>
        <select onChange={(e) => setGrouping(e.target.value)} defaultValue="status">
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>

      {/* Ordering selection dropdown */}
      <label>
        
        <h3>Ordering</h3>
        <select onChange={(e) => setOrdering(e.target.value)} defaultValue="priority">
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
}

export default DisplayOptions;
