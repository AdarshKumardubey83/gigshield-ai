import React from 'react';

export const RiskCard = ({ data }) => {
  return (
    <div className="dash-card dash-card--risk">
      <div className="dash-card__title">
        <span className="card-icon">⚠️</span>
        Environmental Risk
      </div>
      <div className="dash-card__row">
        <span className="label">Active Triggers</span>
        <span className="value value--high">{data.triggers?.join(', ') || 'NONE'}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Risk Level</span>
        <span className="badge badge--red">{data.riskLevel || 'LOW'}</span>
      </div>
    </div>
  );
};
