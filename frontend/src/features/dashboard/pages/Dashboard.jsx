import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { UserCard } from '../components/UserCard';
import { PlanCard } from '../components/PlanCard';
import { RiskCard } from '../components/RiskCard';
import { TriggerCard } from '../components/TriggerCard';
import { PayoutCard } from '../components/PayoutCard';
import '../styles/dashboard.scss';

export const Dashboard = () => {
  const { data, isLoading, error, calculated } = useDashboard();

  if (isLoading) {
    return <div className="dashboard-page__header"><h2>Loading Dashboard...</h2></div>;
  }

  if (error || !data) {
    return <div className="dashboard-page__header"><h2>{error || 'No data found'}</h2></div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <h1>Parametric Insurance Dashboard</h1>
      </div>

      <div className="dashboard-page__grid">
        <UserCard data={data} />
        <PlanCard data={data} />
        <RiskCard data={data} />
        <TriggerCard triggers={calculated.triggers} />
        <PayoutCard data={data} calculated={calculated} />
      </div>

      <div className="dashboard-page__note">
        This payout is automatically triggered using AI-based parametric insurance.
      </div>
    </div>
  );
};
