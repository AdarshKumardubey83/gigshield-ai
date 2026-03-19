import React from 'react';

export const UserCard = ({ data }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__title">User Profile</div>
      <div className="dash-card__row">
        <span className="label">Name</span>
        <span className="value">{data.name}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Zone</span>
        <span className="value">{data.zone}</span>
      </div>
    </div>
  );
};
