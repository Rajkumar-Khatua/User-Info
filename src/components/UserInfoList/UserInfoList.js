import React, { useState } from 'react';
import UserCard from '../UserCard/UserCard';
import './UserInfoList.scss';
const UserInfoList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUserCard = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <UserCard user={selectedUser} onClose={handleCloseUserCard} />
      )}
    </div>
  );
};

export default UserInfoList;
