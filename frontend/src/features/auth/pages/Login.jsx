import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';
import { AuthContext } from '../auth.context';
import '../styles/login.scss';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { saveUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  if (!auth) return;

  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }

  try {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, // ✅ FIRST
      "recaptcha-container", // ✅ SECOND
      {
        size: "invisible"
      }
    );
  } catch (error) {
    // Silently ignore or rely on setErrorMsg handling elsewhere
  }

  return () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };
}, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;

    // --- MOCK LOGIN BYPASS FOR TESTING ---
    if (formattedPhone === '+918318032813') {
      setTimeout(() => {
        setStep('otp');
        setIsLoading(false);
      }, 500);
      return;
    }
    // -------------------------------------

    try {
      const appVerifier = window.recaptchaVerifier;

      if (!appVerifier) {
        setErrorMsg("Recaptcha not ready");
        return;
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setStep('otp');

    } catch (err) {
      setErrorMsg("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // --- MOCK LOGIN BYPASS FOR TESTING ---
    const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
    if (formattedPhone === '+918318032813' && otp === '123456') {
      try {
        const response = await axios.post('/api/auth/mock-login', { phone: formattedPhone }, { withCredentials: true });
        if (response.data.success) {
          saveUser(response.data.data);
          navigate('/dashboard');
        }
      } catch (err) {
        setErrorMsg("Mock Login failed or server error.");
      } finally {
        setIsLoading(false);
      }
      return;
    }
    // -------------------------------------

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      const idToken = await user.getIdToken();

      const response = await axios.post('/api/auth/verify', { idToken }, { withCredentials: true });

      if (response.data.success) {
        saveUser(response.data.data);
        // Navigate to /dashboard — ProtectedRoute checks profile completeness
        // and auto-redirects to /profile-setup if name/location are missing.
        navigate('/dashboard');
      }

    } catch (err) {
      setErrorMsg("Invalid OTP or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container__card">

        {/* Brand header */}
        <div className="auth-container__brand">
          <div className="auth-container__icon">🛡️</div>
          <h1 className="auth-container__title">Govardhan Shield AI</h1>
          <p className="auth-container__subtitle">Protect your daily income with smart insurance</p>
        </div>

        {/* Step badge */}
        <div className="auth-container__steps">
          <span className={`step-badge ${step === 'phone' ? 'step-badge--active' : 'step-badge--done'}`}>1 Phone</span>
          <span className="step-connector" />
          <span className={`step-badge ${step === 'otp' ? 'step-badge--active' : ''}`}>2 Verify</span>
        </div>

        <h2>{step === 'phone' ? 'Enter your phone' : 'Enter OTP'}</h2>

        {errorMsg && <div className="auth-container__error">{errorMsg}</div>}

        {step === 'phone' ? (
          <form className="auth-container__form" onSubmit={sendOtp}>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">📱</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit number"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-loading">Sending<span className="dots" /></span>
              ) : (
                'Send OTP →'
              )}
            </button>

            <div id="recaptcha-container" />
          </form>
        ) : (
          <form className="auth-container__form" onSubmit={verifyOtp}>
            <div className="form-group">
              <label>One-Time Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit code"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-loading">Verifying<span className="dots" /></span>
              ) : (
                'Verify & Continue →'
              )}
            </button>
          </form>
        )}

        <p className="auth-container__trust">🔒 Secured with Firebase &amp; 256-bit encryption</p>

      </div>
    </div>
  );
};