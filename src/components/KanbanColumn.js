import React from 'react';
import TicketCard from './TicketCard';
import '../styles/KanbanColumn.css';

import addIcon from '../assets/add.svg';
import backlogIcon from '../assets/Backlog.svg';
import canceledIcon from '../assets/Cancelled.svg';
import doneIcon from '../assets/Done.svg';
import inProgressIcon from '../assets/in-progress.svg';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import UrgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import todoIcon from '../assets/To-do.svg';
import threeDotMenuIcon from '../assets/3 dot menu.svg';

function KanbanColumn({ title, tickets, isUserColumn }) {
  // Select a random profile image for user columns only
  const randomUserImage = isUserColumn
    ? `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`
    : null;

  const priorityIcons = {
    "Urgent": UrgentIcon, 
    "High": highPriorityIcon,
    "Medium": mediumPriorityIcon,
    "Low": lowPriorityIcon,
    "No Priority": noPriorityIcon
  };

  // Status icon mapping
  const statusIcons = {
    "Todo": todoIcon,
    "In Progress": inProgressIcon,
    "Done": doneIcon,
    "Canceled": canceledIcon,
    "Backlog": backlogIcon
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2 className="column-title">
          {/* Show user image if this is a user-specific column */}
          {isUserColumn && randomUserImage && (
            <img src={randomUserImage} alt={`${title} Profile`} className="user-profile-icon" />
          )}
          
          {/* Display appropriate icon based on the title if it matches a status or priority */}
          {statusIcons[title] && <img src={statusIcons[title]} alt={`${title} Icon`} className="status-icon" />}
          {priorityIcons[title] && <img src={priorityIcons[title]} alt={`${title} Priority Icon`} className="priority-icon" />}
          
          {title}
          {/* Display the number of tickets in this column */}
          {isUserColumn && tickets.length > 0 && (
            <span className="ticket-count">({tickets.length})</span>
          )}
        </h2>

        {/* Buttons for "Add" and "More Options" */}
        <div className="column-buttons">
          <button className="add-button">
            <img src={addIcon} alt="Add Button" className="button-icon" />
          </button>
          <button className="more-button">
          <img src={threeDotMenuIcon} alt="More Options" className="button-icon" />
          </button>
        </div>
      </div>

      <div className="ticket-list">
        {/* Render each ticket as a TicketCard component */}
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
