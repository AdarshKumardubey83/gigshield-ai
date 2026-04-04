import { generateToken } from '../utils/generateToken.js';
import * as authService from '../services/auth.service.js';
import admin from 'firebase-admin';
import User from '../models/User.js';

// Initialize firebase admin
let firebaseAppInitialized = false;

const initFirebaseAdmin = () => {
  if (firebaseAppInitialized) return;

  try {
    // ✅ Load service account safely
    if (!process.env.FIREBASE_SERVICE_KEY) {
      throw new Error("FIREBASE_SERVICE_KEY not set");
    }
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase Admin Initialized ✅");
    }

    firebaseAppInitialized = true;
  } catch (err) {
    console.error('Failed to initialize Firebase Admin:', err.message);
  }
};

// @desc    Verify Firebase Token and Login
// @route   POST /api/auth/verify
// @access  Public
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    initFirebaseAdmin();

    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Missing Firebase ID Token',
      });
    }

    // ✅ Verify token from Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const user = await authService.verifyOrCreateUser(
      decodedToken.uid,
      decodedToken.phone_number || 'Unknown'
    );

    sendTokenResponse(user, 200, res);

  } catch (err) {
    console.error("Firebase auth error:", err.message);

    res.status(401).json({
      success: false,
      message: 'Invalid or expired Firebase token',
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/user/profile
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
    message: 'User logged out',
  });
};


// @desc    Mock login for testing without Firebase
// @route   POST /api/auth/mock-login
// @access  Public
export const mockLogin = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: 'Please provide a phone number' });
    }

    // Direct bypass: Use authService to find or create a user by phone (with a fake firebaseUid)
    const fakeFirebaseUid = `mock-uid-${phone}`;
    const user = await authService.verifyOrCreateUser(fakeFirebaseUid, phone);

    // Send JWT token
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRE || '30') * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  };

  res.status(statusCode).cookie('token', token, options);

  res.json({
    success: true,
    data: {
      id: user._id,
      phoneNumber: user.phoneNumber,
    },
  });
};