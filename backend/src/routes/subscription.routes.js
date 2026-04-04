import express from 'express';
import { addDummySubscription, getMySubscription } from '../controllers/subscription.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route 1: Naya Plan Add / Kharidne ke liye
router.post('/add', protect, addDummySubscription);

// Route 2: Apna active plan dekhne ke liye
router.get('/my-plan', protect, getMySubscription);

export default router;
