import React from 'react';

export const TriggerCard = ({ triggers }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__title">Parametric Triggers</div>
      <div className="dash-card__row">
        <span className="label">Extreme Heat</span>
        <span className={`value ${triggers.heat ? 'value--high' : ''}`}>
          {triggers.heat ? 'TRUE' : 'FALSE'}
        </span>
      </div>
      <div className="dash-card__row">
        <span className="label">Hazardous AQI</span>
        <span className={`value ${triggers.aqi ? 'value--high' : ''}`}>
          {triggers.aqi ? 'TRUE' : 'FALSE'}
        </span>
      </div>
      <div className="dash-card__row">
        <span className="label">Heavy Rain</span>
        <span className={`value ${triggers.rain ? 'value--high' : ''}`}>
          {triggers.rain ? 'TRUE' : 'FALSE'}
        </span>
      </div>
      { (triggers.heat || triggers.aqi || triggers.rain) ? (
        <div className="dash-card__highlight">
          Triggers Activated
        </div>
      ) : (
        <div className="dash-card__highlight success">
          Conditions Normal
        </div>
      )}
    </div>
  );
};
