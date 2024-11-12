import React, { useState, useEffect } from 'react';
import DisplayOptions from './DisplayOptions';
import KanbanColumn from './KanbanColumn';
import { groupTickets, sortTickets } from '../utils';
import '../styles/KanbanBoard.css';

function KanbanBoard({ tickets, users = [] }) {
  // Retrieve saved settings or default values for grouping and ordering tickets
  const savedGrouping = localStorage.getItem('kanbanGrouping') || 'status';
  const savedOrdering = localStorage.getItem('kanbanOrdering') || 'priority';

  const [grouping, setGrouping] = useState(savedGrouping);
  const [ordering, setOrdering] = useState(savedOrdering);

  // Update localStorage whenever grouping or ordering changes
  useEffect(() => {
    localStorage.setItem('kanbanGrouping', grouping);
    localStorage.setItem('kanbanOrdering', ordering);
  }, [grouping, ordering]);

  // Group tickets based on the current grouping option
  const groupedTickets = groupTickets(tickets, grouping, users);

  return (
    <div className="kanban-board">
      {/* DisplayOptions component allows user to change grouping and ordering */}
      <DisplayOptions setGrouping={setGrouping} setOrdering={setOrdering} />
      
      <div className="kanban-columns">
        {/* Render columns based on grouping selection */}
        {grouping === 'user' ? (
          users.map((user) => (
            <KanbanColumn
              key={user.id}
              title={user.name}
              tickets={sortTickets(groupedTickets[user.id] || [], ordering)}
              isUserColumn={true} // Flag to identify user-specific columns
            />
          ))
        ) : (
          Object.keys(groupedTickets).map((group) => (
            <KanbanColumn
              key={group}
              title={group}
              tickets={sortTickets(groupedTickets[group], ordering)}
              isUserColumn={false} // Standard column without user specificity
            />
          ))
        )}

        {/* Special column for tickets with unknown grouping (e.g., unassigned user) */}
        {grouping === 'user' && groupedTickets["Unknown"] && (
          <KanbanColumn
            key="Unknown"
            title="Unknown"
            tickets={sortTickets(groupedTickets["Unknown"], ordering)}
            isUserColumn={false} // No user-specific styling
          />
        )}
      </div>
    </div>
  );
}

export default KanbanBoard;
