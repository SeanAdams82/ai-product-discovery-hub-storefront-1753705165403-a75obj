import { PluginInterface } from './PluginInterface.js';

/**
 * AI Recommendation Plugin Interface
 * Implement this class to create new AI-powered recommendation engines
 */
export class AIRecommendationPlugin extends PluginInterface {
  static pluginType = 'ai_recommendation';

  constructor(config) {
    super(config);
    this.modelConfig = config.model || {};
    this.recommendationTypes = config.types || ['similar', 'complementary', 'alternative'];
  }

  /**
   * Generate product recommendations
   * @param {Product|Array<Product>} context - Context product(s)
   * @param {Object} userProfile - User preferences and history
   * @param {Object} options - Recommendation options
   * @returns {Promise<Array<Recommendation>>}
   */
  async generateRecommendations(context, userProfile = {}, options = {}) {
    throw new Error('generateRecommendations() method must be implemented');
  }

  /**
   * Predict user preferences
   * @param {Object} userProfile - User data
   * @param {Array<Product>} products - Available products
   * @returns {Promise<Array<PreferenceScore>>}
   */
  async predictPreferences(userProfile, products) {
    throw new Error('predictPreferences() method must be implemented');
  }

  /**
   * Learn from user interactions
   * @param {Array<UserInteraction>} interactions
   * @returns {Promise<void>}
   */
  async learnFromInteractions(interactions) {
    // Default implementation - override if needed
  }

  /**
   * Get supported recommendation types
   * @returns {Array<string>}
   */
  getSupportedTypes() {
    return this.recommendationTypes;
  }

  getCapabilities() {
    return ['recommendations', 'preference_prediction', 'learning'];
  }
}