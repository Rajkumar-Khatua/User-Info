import React from 'react';
import './UserListSkeleton.scss';

const UserListSkeleton = () => {
  return (
    <div className="user-list-skeleton">
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
      <div className="skeleton-item"></div>
    </div>
  );
};

export default UserListSkeleton;
