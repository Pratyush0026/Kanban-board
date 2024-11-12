import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdPriorityHigh } from 'react-icons/md';
import { AiOutlineMedium } from 'react-icons/ai';
import { FiArrowDown } from 'react-icons/fi';
import { BsDashCircle } from 'react-icons/bs';
import '../styles/TicketCard.css';

const defaultUserImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/53.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/85.jpg'
];

function TicketCard({ ticket }) {
  // Icons representing different ticket priority levels
  const priorityIcons = [
    <BsDashCircle className="no-priority-icon" />,       // No priority
    <FiArrowDown className="low-priority-icon" />,        // Low priority
    <AiOutlineMedium className="medium-priority-icon" />, // Medium priority
    <MdPriorityHigh className="high-priority-icon" />,    // High priority
    <FaExclamationCircle className="urgent-priority-icon" />  // Urgent priority
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
        <span className="priority-icon">{priorityIcons[ticket.priority]}</span>
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
