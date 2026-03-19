import { useContext, useState } from 'react';
import { AuthContext } from '../auth.context';
import { loginUser as loginService, registerUser as registerService } from '../services/auth.service';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginService(credentials);
      // Assuming backend returns { user, token } or similar
      context.saveUser(data.user, data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await registerService(userData);
      context.saveUser(data.user, data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: context.user,
    token: context.token,
    logout: context.logout,
    login,
    register,
    isLoading,
    error,
  };
};
