import React from 'react';

export const RiskCard = ({ data }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__title">Environmental Risk</div>
      <div className="dash-card__row">
        <span className="label">Temperature</span>
        <span className="value value--high">{data.temperature}°C</span>
      </div>
      <div className="dash-card__row">
        <span className="label">AQI</span>
        <span className="value value--high">{data.aqi}</span>
      </div>
      <div className="dash-card__row">
        <span className="label">Rain</span>
        <span className="value">{data.rain}</span>
      </div>
      <div className="dash-card__highlight">
        Risk Level: HIGH
      </div>
    </div>
  );
};
