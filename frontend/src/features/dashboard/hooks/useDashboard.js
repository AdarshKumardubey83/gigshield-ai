import { useContext, useState, useEffect } from 'react';
import { DashboardContext } from '../state/dashboard.context';
import { fetchDashboardData } from '../services/dashboard.service';

export const useDashboard = (location) => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }

  const { dashboardData, setDashboardData } = context;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const loadData = async () => {
      try {
        const data = await fetchDashboardData(location);
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
  }, [dashboardData, setDashboardData, location]);

  // Derived logical fields mapping new backend response
  const triggers = {
    heat: dashboardData?.triggers?.includes("HEAT"),
    aqi: dashboardData?.triggers?.includes("AQI"),
    rain: dashboardData?.triggers?.includes("RAIN")
  };
  
  const finalPayout = dashboardData?.claim?.amount || 0;
  const loss = finalPayout > 0 ? finalPayout : 0; // Simplified for UI display

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
