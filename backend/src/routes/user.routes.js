import express from 'express';
import { updateProfileCompletion } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// @route   PUT /api/user/update
// @desc    Update user profile for completion
// @access  Private
router.put('/update', protect, updateProfileCompletion);

export default router;
