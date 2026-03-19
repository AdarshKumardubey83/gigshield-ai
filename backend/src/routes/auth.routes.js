import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Please add a name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  validate,
  login
);

// We map /api/user/profile here to reuse the router, or create a separate user router.
// The requirements asked for GET /api/user/profile, but keeping auth routes together is cleaner.
// I will create the distinct path in app.js as well.
router.get('/profile', protect, getMe);

export default router;
