import express from 'express';
import { checkWeather } from '../controllers/weather.controller.js';

const router = express.Router();

// POST /api/weather
router.post('/', checkWeather);

export default router;
