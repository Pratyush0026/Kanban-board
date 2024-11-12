import React from 'react';
import '../styles/TicketCard.css';

import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';

const defaultUserImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/53.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/85.jpg'
];

function TicketCard({ ticket }) {
  const priorityIcons = [
    noPriorityIcon,       // No priority
    lowPriorityIcon,        // Low priority
    mediumPriorityIcon, // Medium priority
    highPriorityIcon,    // High priority
    highPriorityIcon     // Urgent priority (same as High for now)
  ];

  // Randomly select a user image for the ticket
  const randomUserImage = defaultUserImages[Math.floor(Math.random() * defaultUserImages.length)];

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {/* Display selected random user image */}
        <img src={randomUserImage} alt="User Profile" className="ticket-user-image" />
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-priority">
        {/* Display the priority icon and label */}
        <img src={priorityIcons[ticket.priority]} alt={`${ticket.priority} Priority`} className="priority-icon" />
        <span className="priority-label">
          {["No Priority", "Low", "Medium", "High", "Urgent"][ticket.priority]}
        </span>
      </div>
      {/* Display ticket tag, defaulting to "Feature Request" if no tag is provided */}
      <div className="ticket-tag">{ticket.tag[0] || "Feature Request"}</div>
    </div>
  );
}

export default TicketCard;
