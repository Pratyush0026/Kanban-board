import React from 'react';
import TicketCard from './TicketCard';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdPriorityHigh } from 'react-icons/md';
import { AiOutlineMedium } from 'react-icons/ai';
import { FiArrowDown, FiCircle, FiPlayCircle, FiArchive } from 'react-icons/fi';
import { BsDashCircle, BsCheckCircle } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import '../styles/KanbanColumn.css';

// Default user profile images for column headers
const defaultUserImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/53.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/85.jpg'
];

function KanbanColumn({ title, tickets, isUserColumn }) {
  // Select a random profile image for user columns only
  const randomUserImage = isUserColumn
    ? defaultUserImages[Math.floor(Math.random() * defaultUserImages.length)]
    : null;

  // Define priority icons for quick access
  const priorityIcons = {
    "Urgent": <FaExclamationCircle className="urgent-priority-icon" />,
    "High": <MdPriorityHigh className="high-priority-icon" />,
    "Medium": <AiOutlineMedium className="medium-priority-icon" />,
    "Low": <FiArrowDown className="low-priority-icon" />,
    "No Priority": <BsDashCircle className="no-priority-icon" />
  };

  // Define status icons for quick access
  const statusIcons = {
    "Todo": <FiCircle className="todo-status-icon" />,
    "In Progress": <FiPlayCircle className="in-progress-status-icon" />,
    "Done": <BsCheckCircle className="done-status-icon" />,
    "Canceled": <RxCrossCircled className="canceled-status-icon" />,
    "Backlog": <FiArchive className="backlog-status-icon" />
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
          {statusIcons[title] || priorityIcons[title] || null}
          {title}
          {/* Display the number of tickets in this column */}
          {isUserColumn && tickets.length > 0 && (
            <span className="ticket-count">({tickets.length})</span>
          )}
        </h2>

        {/* Buttons for "Add" and "More Options" */}
        <div className="column-buttons">
          <button className="add-button">+</button>
          <button className="more-button">...</button>
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
