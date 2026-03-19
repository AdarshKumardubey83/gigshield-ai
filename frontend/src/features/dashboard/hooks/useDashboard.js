import { useContext, useState, useEffect } from 'react';
import { DashboardContext } from '../state/dashboard.context';
import { fetchDashboardData } from '../services/dashboard.service';

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }

  const { dashboardData, setDashboardData } = context;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    if (!dashboardData) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [dashboardData, setDashboardData]);

  // Derived logical fields
  const loss = dashboardData ? Math.max(0, dashboardData.expectedIncome - dashboardData.actualIncome) : 0;
  
  // Static trigger logic mock
  const triggers = {
    heat: dashboardData?.temperature > 40,
    aqi: dashboardData?.aqi > 300,
    rain: dashboardData?.rain === 'Heavy' || dashboardData?.rain === 'High'
  };
  
  const finalPayout = (triggers.heat || triggers.aqi || triggers.rain) && loss > 0 
    ? Math.min(loss, dashboardData?.coverage || 0) 
    : 0;

  return {
    data: dashboardData,
    isLoading,
    error,
    calculated: {
      loss,
      triggers,
      finalPayout
    }
  };
};
