import React from 'react';
import "./UserCard.scss"
const UserCard = ({ user, onClose }) => {
  return (
    <div className="user-card">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
      <p>Website: {user.website}</p>
    </div>
  );
};

export default UserCard;
