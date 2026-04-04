import React from 'react';

export const PayoutCard = ({ data, calculated }) => {
  const hasPayout = calculated.finalPayout > 0;

  return (
    <div className="dash-card dash-card--payout">
      <div className="dash-card__title">
        <span className="card-icon">💰</span>
        Payout Assessment
      </div>

      <div className="dash-card__row">
        <span className="label">Status</span>
        <span className="value">{data.claim?.status || 'N/A'}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Assessment</span>
        <span className="value">Automated</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Payout Amount</span>
        <span className="value value--high">₹{calculated.finalPayout || 0}</span>
      </div>

      <div className="payout-divider" />

      <div className="payout-amount">
        <div className="payout-label">Your Payout</div>
        {hasPayout ? (
          <>
            <div className="payout-value">₹{calculated.finalPayout}</div>
            <div className="payout-credit">
              ₹{calculated.finalPayout} will be credited automatically
            </div>
          </>
        ) : (
          <>
            <div className="payout-zero">₹0</div>
            <div className="payout-sub">No active triggers at this time</div>
          </>
        )}
      </div>

      <div className={`dash-card__highlight ${hasPayout ? 'success' : ''}`}>
        {hasPayout
          ? '✅ Payout Approved — Disbursing Soon'
          : '⏳ Monitoring — No Trigger Conditions Met'}
      </div>
    </div>
  );
};
