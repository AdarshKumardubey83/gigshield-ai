import React from 'react';

export const PayoutCard = ({ data, calculated }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__title">Payout Assessment</div>
      <div className="dash-card__row">
        <span className="label">Expected Income</span>
        <span className="value">₹{data.expectedIncome}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Actual Income</span>
        <span className="value">₹{data.actualIncome}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Calculated Loss</span>
        <span className="value value--high">₹{calculated.loss}</span>
      </div>
      <div className={`dash-card__highlight ${calculated.finalPayout > 0 ? 'success' : ''}`}>
        Final Payout: ₹{calculated.finalPayout}
      </div>
    </div>
  );
};
