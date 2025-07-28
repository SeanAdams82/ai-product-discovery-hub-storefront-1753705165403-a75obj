import { PluginInterface } from './PluginInterface.js';

/**
 * Comparison Engine Plugin Interface
 * Implement this class to create new product comparison engines
 */
export class ComparisonEnginePlugin extends PluginInterface {
  static pluginType = 'comparison_engine';

  constructor(config) {
    super(config);
    this.comparisonCriteria = config.criteria || [];
    this.weightingSystem = config.weighting || 'equal';
  }

  /**
   * Compare multiple products
   * @param {Array<Product>} products - Products to compare
   * @param {Object} criteria - Comparison criteria
   * @returns {Promise<ComparisonResult>}
   */
  async compareProducts(products, criteria = {}) {
    throw new Error('compareProducts() method must be implemented');
  }

  /**
   * Calculate similarity score between products
   * @param {Product} product1
   * @param {Product} product2
   * @returns {Promise<number>} Similarity score (0-1)
   */
  async calculateSimilarity(product1, product2) {
    throw new Error('calculateSimilarity() method must be implemented');
  }

  /**
   * Rank products based on criteria
   * @param {Array<Product>} products
   * @param {Object} criteria
   * @returns {Promise<Array<RankedProduct>>}
   */
  async rankProducts(products, criteria) {
    throw new Error('rankProducts() method must be implemented');
  }

  /**
   * Get available comparison criteria
   * @returns {Array<CriteriaDefinition>}
   */
  getAvailableCriteria() {
    return this.comparisonCriteria;
  }

  getCapabilities() {
    return ['comparison', 'similarity', 'ranking'];
  }
}