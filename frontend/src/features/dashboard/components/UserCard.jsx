import React from 'react';
import { useAuth } from '../../auth/hooks/useAuth';

export const UserCard = ({ data }) => {
  const { user } = useAuth();
  return (
    <div className="dash-card">
      <div className="dash-card__title">
        <span className="card-icon">👤</span>
        User Profile
      </div>
      <div className="dash-card__row">
        <span className="label">Name</span>
        <span className="value">{user?.name || "N/A"}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">City</span>
        <span className="value value--primary">{user?.location?.city || user?.location || "Not set"}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Account</span>
        <span className="badge badge--green">Verified</span>
      </div>
    </div>
  );
};
