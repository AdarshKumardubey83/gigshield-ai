// Mock static data for the dashboard concept demo
const MOCK_DATA = {
  name: "Rahul",
  zone: "Delhi NCR",
  plan: "Standard",
  premium: 40,
  coverage: 1000,
  temperature: 42,
  aqi: 310,
  rain: "Moderate",
  expectedIncome: 4500,
  actualIncome: 3600
};

export const fetchDashboardData = async () => {
  // Simulate an async API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
    }, 500);
  });
};
