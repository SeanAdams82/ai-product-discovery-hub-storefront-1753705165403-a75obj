import express from 'express';
import { PluginManager } from '../../core/plugin-system/PluginManager.js';

const router = express.Router();

/**
 * Multi-source product search
 * POST /api/v1/search
 */
router.post('/', async (req, res) => {
  try {
    const { query, filters = {}, sources = [] } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const pluginManager = req.app.get('pluginManager');
    const searchPlugins = pluginManager.getPluginsByType('website_search');
    
    // Filter plugins by requested sources if specified
    const activePlugins = sources.length > 0 
      ? searchPlugins.filter(plugin => sources.includes(plugin.name))
      : searchPlugins;

    const searchPromises = activePlugins.map(async (plugin) => {
      try {
        const results = await plugin.searchProducts(query, filters);
        return {
          source: plugin.name,
          results,
          status: 'success'
        };
      } catch (error) {
        return {
          source: plugin.name,
          results: [],
          status: 'error',
          error: error.message
        };
      }
    });

    const searchResults = await Promise.all(searchPromises);
    
    res.json({
      query,
      filters,
      sources: searchResults,
      total_results: searchResults.reduce((sum, source) => sum + source.results.length, 0),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get available search sources
 * GET /api/v1/search/sources
 */
router.get('/sources', (req, res) => {
  const pluginManager = req.app.get('pluginManager');
  const searchPlugins = pluginManager.getPluginsByType('website_search');
  
  const sources = searchPlugins.map(plugin => ({
    name: plugin.name,
    metadata: plugin.getMetadata(),
    supported_filters: plugin.getSupportedFilters()
  }));

  res.json({ sources });
});

export { router as searchRoutes };