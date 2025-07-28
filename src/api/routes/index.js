import express from 'express';
import { searchRoutes } from './search.js';
import { comparisonRoutes } from './comparison.js';
import { recommendationRoutes } from './recommendations.js';
import { pluginRoutes } from './plugins.js';

const router = express.Router();

// Mount route modules
router.use('/search', searchRoutes);
router.use('/comparison', comparisonRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/plugins', pluginRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

export { router as apiRoutes };