import React from 'react';

export const PlanCard = ({ data }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__title">
        <span className="card-icon">🛡️</span>
        Insurance Plan
      </div>
      <div className="dash-card__row">
        <span className="label">Plan</span>
        <span className="value">{data.plan || 'Standard'}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Weekly Premium</span>
        <span className="value value--primary">₹{data.premium || 0}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Coverage</span>
        <span className="value value--success">₹{data.coverage}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Status</span>
        <span className="badge badge--green">ACTIVE</span>
      </div>
    </div>
  );
};
