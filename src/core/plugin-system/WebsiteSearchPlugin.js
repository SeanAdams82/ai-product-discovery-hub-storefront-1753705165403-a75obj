import { PluginInterface } from './PluginInterface.js';

/**
 * Website Search Plugin Interface
 * Implement this class to create new website search plugins
 */
export class WebsiteSearchPlugin extends PluginInterface {
  static pluginType = 'website_search';

  constructor(config) {
    super(config);
    this.baseUrl = config.baseUrl;
    this.searchParams = config.searchParams || {};
    this.rateLimit = config.rateLimit || { requests: 10, window: 60000 };
  }

  /**
   * Search for products on the website
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Promise<Array<Product>>}
   */
  async searchProducts(query, filters = {}) {
    throw new Error('searchProducts() method must be implemented');
  }

  /**
   * Get product details by ID
   * @param {string} productId - Product identifier
   * @returns {Promise<Product>}
   */
  async getProductDetails(productId) {
    throw new Error('getProductDetails() method must be implemented');
  }

  /**
   * Parse product data from HTML/API response
   * @param {string|Object} data - Raw data
   * @returns {Product}
   */
  parseProductData(data) {
    throw new Error('parseProductData() method must be implemented');
  }

  /**
   * Get supported search filters
   * @returns {Array<FilterDefinition>}
   */
  getSupportedFilters() {
    return [];
  }

  getCapabilities() {
    return ['search', 'product_details', 'filtering'];
  }
}