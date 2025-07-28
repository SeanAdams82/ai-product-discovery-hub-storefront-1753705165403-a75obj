# AI Product Discovery Hub

A modular, extensible AI-powered product discovery platform that enables seamless integration of new data sources, comparison engines, and recommendation algorithms.

## Features

- 🔌 **Plugin Architecture**: Easy to extend with new data sources and algorithms
- 🤖 **AI-Powered**: Built-in support for AI recommendations and comparisons
- 🌐 **Multi-Source**: Search across multiple e-commerce platforms
- ⚡ **High Performance**: Optimized for scalability and speed
- 🔧 **Configurable**: Extensive configuration options
- 📊 **Analytics Ready**: Built-in metrics and monitoring

## Quick Start

1. **Installation**
   ```bash
   npm install
   ```

2. **Configuration**
   Edit `config/platform.json` with your settings

3. **Start the Platform**
   ```bash
   npm start
   ```

4. **Test API**
   ```bash
   curl -X POST http://localhost:3000/api/v1/search \
     -H "Content-Type: application/json" \
     -d '{"query": "laptop", "filters": {"category": "Electronics"}}'
   ```

## Architecture

The platform is built around a plugin system with three main plugin types:

- **Website Search Plugins**: Integration with e-commerce sites
- **Comparison Engine Plugins**: Product comparison algorithms  
- **AI Recommendation Plugins**: AI-powered recommendation systems

## Plugin Development

Create new plugins by extending the base plugin classes:

```javascript
import { WebsiteSearchPlugin } from './src/core/plugin-system/WebsiteSearchPlugin.js';

export class MyStorePlugin extends WebsiteSearchPlugin {
  // Implement required methods
}
```

See [Plugin Development Guide](docs/PLUGIN_DEVELOPMENT.md) for details.

## API Documentation

### Search Products
`POST /api/v1/search`

### Compare Products  
`POST /api/v1/comparison/compare`

### Get Recommendations
`POST /api/v1/recommendations/generate`

See [API Documentation](docs/API.md) for complete reference.

## Configuration

Configure the platform through JSON files in the `config/` directory:

- `platform.json`: Main configuration
- `development.json`: Development settings
- `production.json`: Production settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your plugin or feature
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
