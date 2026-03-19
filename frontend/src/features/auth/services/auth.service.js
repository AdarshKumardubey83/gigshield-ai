export const loginUser = async (credentials) => {
  // Using static raw data to bypass backend and allow instant access
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { email: credentials.email, name: "Test User" }, token: "mock-jwt-token" });
    }, 500);
  });
};

export const registerUser = async (userData) => {
  // Using static raw data to bypass backend and allow instant access
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { email: userData.email, name: userData.name }, token: "mock-jwt-token" });
    }, 500);
  });
};
