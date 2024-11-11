import React from 'react';
import '../styles/DisplayOptions.css';

// Component to allow users to select grouping and ordering options
function DisplayOptions({ setGrouping, setOrdering }) {
  return (
    <div className="display-options">
      {/* Grouping selection dropdown */}
      <label>
        Grouping
        <select onChange={(e) => setGrouping(e.target.value)} defaultValue="status">
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </label>

      {/* Ordering selection dropdown */}
      <label>
        Ordering
        <select onChange={(e) => setOrdering(e.target.value)} defaultValue="priority">
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </label>
    </div>
  );
}

export default DisplayOptions;
