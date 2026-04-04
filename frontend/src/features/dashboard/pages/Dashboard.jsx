import React, { useState, useEffect } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useAuth } from '../../auth/hooks/useAuth';
import { UserCard } from '../components/UserCard';
import { PlanCard } from '../components/PlanCard';
import { RiskCard } from '../components/RiskCard';
import { TriggerCard } from '../components/TriggerCard';
import { PayoutCard } from '../components/PayoutCard';
import '../styles/dashboard.scss';

export const Dashboard = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState({ lat: null, lon: null });
  const { data, isLoading, error, calculated } = useDashboard(location);
  const [showPlanModal, setShowPlanModal] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
        console.log("Latitude:", lat);
        console.log("Longitude:", lon);
      },
      (error) => {
        console.log("Location error:", error);
      }
    );
  }, []);

  if (isLoading) {
    return (
      <div className="db-loading">
        <div className="db-loading__spinner" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="db-loading">
        <p>⚠️ {error || 'No data found'}</p>
      </div>
    );
  }

  const temp = data?.temp;
  const rain = data?.rain;
  const wind = data?.wind;
  const clouds = data?.clouds;

  const anyTriggered = calculated.triggers.heat || calculated.triggers.aqi || calculated.triggers.rain;
  const triggerList = data.triggers?.join(', ') || 'NONE';

  return (
    <div className="db dashboard-container">

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="db-hero">
        <div className="db-hero__glow" />
        <div className="db-hero__content">
          <div className="db-hero__badge">
            {anyTriggered ? `⚠️ Detected: ${triggerList}` : '🟢 All Clear'}
          </div>
          <p className="hero-quote">
            “आप काम करें निडर होकर,<br/>
            बाकी सुरक्षा हमारी जिम्मेदारी है”
          </p>
          <h1 className="db-hero__heading">Protect Your Daily Income</h1>
          <p className="db-hero__sub">
            AI-powered parametric insurance for delivery workers
          </p>
          <div className={`db-hero__status ${anyTriggered ? 'db-hero__status--alert' : 'db-hero__status--safe'}`}>
            {anyTriggered
              ? '⚠️ Extreme Conditions — Your Policy is Covering Potential Loss'
              : '✅ Conditions Safe — Continuous Real-Time Monitoring Active'}
          </div>
          <div className="db-hero__meta">
            <span>🛡️ Risk Level: <b>{data.riskLevel || 'LOW'}</b></span>
            <span>📍 Active Zone: <b>{data.zone || 'DELHI'}</b></span>
            <span className="badge badge--green">🛡️ Policy Active</span>
          </div>

          <div className="live-weather">
            <p>📍 Live Monitoring</p>
            <p>🌡 Temp: {temp?.toFixed(1)}°C</p>
            <p>🌧 Rain: {rain} mm</p>
            <p>💨 Wind: {wind} m/s</p>
            <p>☁ Clouds: {clouds}%</p>
          </div>
        </div>
      </section>

      {/* ── LEVEL 1 — PRIMARY CARDS ──────────────────────── */}
      <section className="db-section">
        <div className="section-box">
          <div className="section-title">Critical Information</div>
          <div className="db-grid db-grid--primary">
  
            <RiskCard data={data} />
  
            <div className="db-payout-hero">
              <PayoutCard data={data} calculated={calculated} />
            </div>
  
          </div>
        </div>
      </section>

      {/* ── LEVEL 2 — SECONDARY CARDS ────────────────────── */}
      <section className="db-section">
        <div className="section-box">
          <div className="section-title">Your Plan & Status</div>
          <div className="db-grid db-grid--secondary">
  
            <UserCard data={data} />
  
            <div onClick={() => setShowPlanModal(true)} style={{ cursor: 'pointer' }}>
              <PlanCard data={data} />
            </div>
  
            <TriggerCard triggers={calculated.triggers} />
  
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ──────────────────────────────────── */}
      <div className="db-note">
        🤖 Payouts are automatically triggered using AI-based parametric insurance — no claim filing needed.
      </div>

      {/* ── PLAN MODAL ───────────────────────────────────── */}
      {showPlanModal && (
        <div
          id="plan-modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowPlanModal(false)}
        >
          <div
            id="plan-modal-box"
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px 28px',
              minWidth: '300px',
              maxWidth: '420px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '1.25rem', color: '#1a1a2e' }}>
              Your Insurance Plan
            </h2>
            <div style={{ textAlign: 'left', marginBottom: '24px', lineHeight: '2' }}>
              <div><span style={{ color: '#888' }}>Coverage Amount:</span> <strong>₹1000</strong></div>
              <div><span style={{ color: '#888' }}>Weekly Premium:</span> <strong>₹40</strong></div>
              <div><span style={{ color: '#888' }}>Plan Type:</span> <strong>Standard Plan</strong></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                id="plan-modal-change"
                onClick={() => setShowPlanModal(false)}
                style={{ padding: '10px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer' }}
              >
                Change Plan
              </button>
              <button
                id="plan-modal-close"
                onClick={() => setShowPlanModal(false)}
                style={{ padding: '10px 24px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


