/**
 * Plugin Manager - Handles loading, managing, and orchestrating plugins
 */
export class PluginManager {
  constructor(config = {}) {
    this.plugins = new Map();
    this.pluginsByType = new Map();
    this.config = config;
    this.hooks = new Map();
  }

  /**
   * Register a plugin
   * @param {PluginInterface} plugin
   */
  async registerPlugin(plugin) {
    if (!plugin.name) {
      throw new Error('Plugin must have a name');
    }

    await plugin.initialize();
    
    this.plugins.set(plugin.name, plugin);
    
    const type = plugin.constructor.pluginType;
    if (type) {
      if (!this.pluginsByType.has(type)) {
        this.pluginsByType.set(type, new Set());
      }
      this.pluginsByType.get(type).add(plugin);
    }

    this.emit('plugin:registered', { plugin });
  }

  /**
   * Get plugins by type
   * @param {string} type
   * @returns {Array<PluginInterface>}
   */
  getPluginsByType(type) {
    const plugins = this.pluginsByType.get(type) || new Set();
    return Array.from(plugins).filter(plugin => plugin.enabled);
  }

  /**
   * Execute method across all plugins of a type
   * @param {string} type
   * @param {string} method
   * @param {...any} args
   * @returns {Promise<Array>}
   */
  async executeAcrossType(type, method, ...args) {
    const plugins = this.getPluginsByType(type);
    const results = [];

    for (const plugin of plugins) {
      if (typeof plugin[method] === 'function') {
        try {
          const result = await plugin[method](...args);
          results.push({ plugin: plugin.name, result });
        } catch (error) {
          results.push({ plugin: plugin.name, error: error.message });
        }
      }
    }

    return results;
  }

  /**
   * Get plugin metadata
   * @returns {Array<Object>}
   */
  getPluginMetadata() {
    return Array.from(this.plugins.values()).map(plugin => plugin.getMetadata());
  }

  /**
   * Health check all plugins
   * @returns {Promise<Object>}
   */
  async healthCheck() {
    const results = {};
    
    for (const [name, plugin] of this.plugins) {
      try {
        results[name] = await plugin.healthCheck();
      } catch (error) {
        results[name] = false;
      }
    }

    return results;
  }

  /**
   * Event system
   */
  on(event, callback) {
    if (!this.hooks.has(event)) {
      this.hooks.set(event, []);
    }
    this.hooks.get(event).push(callback);
  }

  emit(event, data) {
    const callbacks = this.hooks.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
}