import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth.context';
import '../styles/login.scss';

export const ProfileSetup = () => {
  const { user, saveUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.put(
        '/api/user/update',
        { name, location: { city: location } },
        { withCredentials: true }
      );

      console.log('Profile saved:', res.data);

      // Update in-memory user so ProtectedRoute sees name+location immediately
      saveUser({ ...user, name, location });

      navigate('/dashboard');

    } catch (err) {
      console.error('Error saving profile:', err);
      setErrorMsg('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container__card">

        {/* Brand header */}
        <div className="auth-container__brand">
          <div className="auth-container__icon">👤</div>
          <h1 className="auth-container__title">Complete Your Profile</h1>
          <p className="auth-container__subtitle">
            We need a few details to protect your income
          </p>
        </div>

        {/* Step indicator */}
        <div className="auth-container__steps">
          <span className="step-badge step-badge--done">1 Phone</span>
          <span className="step-connector" />
          <span className="step-badge step-badge--done">2 Verify</span>
          <span className="step-connector" />
          <span className="step-badge step-badge--active">3 Profile</span>
        </div>

        <h2>Tell us about yourself</h2>

        {errorMsg && <div className="auth-container__error">{errorMsg}</div>}

        <form className="auth-container__form" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Your Name</label>
            <div className="input-wrapper">
              <span className="input-icon">✍️</span>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>Your City / Zone</label>
            <div className="input-wrapper">
              <span className="input-icon">📍</span>
              <input
                id="profile-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city / zone"
                required
                autoComplete="address-level2"
              />
            </div>
          </div>

          <button id="profile-submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="btn-loading">
                Saving<span className="dots" />
              </span>
            ) : (
              'Save & Continue →'
            )}
          </button>

        </form>

        <p className="auth-container__trust">
          🔒 Your data is encrypted and never shared
        </p>

      </div>
    </div>
  );
};
