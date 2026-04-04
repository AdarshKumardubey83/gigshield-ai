import express from 'express';
import { body } from 'express-validator';
import { verifyFirebaseToken, getMe, logout, mockLogin } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post(
  '/verify',
  [
    body('idToken', 'Please provide a firebase idToken').exists(),
  ],
  validate,
  verifyFirebaseToken
);

router.get('/logout', logout);

router.post('/mock-login', mockLogin);

// We map /api/user/profile here to reuse the router, or create a separate user router.
// The requirements asked for GET /api/user/profile, but keeping auth routes together is cleaner.
// I will create the distinct path in app.js as well.
router.get('/profile', protect, getMe);
export default router;
