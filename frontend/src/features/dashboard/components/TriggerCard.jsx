import React from 'react';

export const TriggerCard = ({ triggers }) => {
  const anyTriggered = triggers.heat || triggers.aqi || triggers.rain;

  return (
    <div className="dash-card">
      <div className="dash-card__title">
        <span className="card-icon">⚡</span>
        Parametric Triggers
      </div>
      <div className="dash-card__row">
        <span className="label">Extreme Heat (&gt;40°C)</span>
        <span className={`badge ${triggers.heat ? 'badge--red' : 'badge--grey'}`}>
          {triggers.heat ? 'TRIGGERED' : 'NORMAL'}
        </span>
      </div>
      <div className="dash-card__row">
        <span className="label">Hazardous AQI (&gt;300)</span>
        <span className={`badge ${triggers.aqi ? 'badge--red' : 'badge--grey'}`}>
          {triggers.aqi ? 'TRIGGERED' : 'NORMAL'}
        </span>
      </div>
      <div className="dash-card__row">
        <span className="label">Heavy Rain</span>
        <span className={`badge ${triggers.rain ? 'badge--red' : 'badge--grey'}`}>
          {triggers.rain ? 'TRIGGERED' : 'NORMAL'}
        </span>
      </div>
      <div className={`dash-card__highlight ${anyTriggered ? '' : 'success'}`}>
        {anyTriggered ? '🔴 Triggers Activated — Claim Eligible' : '🟢 Conditions Normal'}
      </div>
    </div>
  );
};
