/**
 * Base Plugin Interface for AI Product Discovery Platform
 * All plugins must implement this interface
 */
export class PluginInterface {
  constructor(config = {}) {
    this.config = config;
    this.name = config.name || 'UnnamedPlugin';
    this.version = config.version || '1.0.0';
    this.enabled = config.enabled !== false;
  }

  /**
   * Initialize the plugin
   * @returns {Promise<void>}
   */
  async initialize() {
    throw new Error('initialize() method must be implemented');
  }

  /**
   * Get plugin metadata
   * @returns {Object}
   */
  getMetadata() {
    return {
      name: this.name,
      version: this.version,
      type: this.constructor.pluginType,
      enabled: this.enabled,
      capabilities: this.getCapabilities()
    };
  }

  /**
   * Get plugin capabilities
   * @returns {Array<string>}
   */
  getCapabilities() {
    return [];
  }

  /**
   * Cleanup resources
   * @returns {Promise<void>}
   */
  async cleanup() {
    // Default implementation - override if needed
  }

  /**
   * Health check
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    return true;
  }
}