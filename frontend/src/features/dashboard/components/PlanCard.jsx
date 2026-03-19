import React from 'react';

export const PlanCard = ({ data }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__title">Insurance Plan</div>
      <div className="dash-card__row">
        <span className="label">Plan</span>
        <span className="value">{data.plan}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Premium</span>
        <span className="value">₹{data.premium}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Coverage</span>
        <span className="value">₹{data.coverage}</span>
      </div>
      <div className="dash-card__highlight success">
        Status: ACTIVE
      </div>
    </div>
  );
};
