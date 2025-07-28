/**
 * Product Data Model
 */
export class Product {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.currency = data.currency || 'USD';
    this.images = data.images || [];
    this.url = data.url;
    this.source = data.source;
    this.category = data.category;
    this.brand = data.brand;
    this.rating = data.rating;
    this.reviews_count = data.reviews_count;
    this.specifications = data.specifications || {};
    this.features = data.features || [];
    this.availability = data.availability;
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
  }

  /**
   * Normalize product data for comparison
   */
  normalize() {
    return {
      ...this,
      price: parseFloat(this.price) || 0,
      rating: parseFloat(this.rating) || 0,
      reviews_count: parseInt(this.reviews_count) || 0
    };
  }

  /**
   * Get product hash for deduplication
   */
  getHash() {
    const hashData = `${this.name}-${this.brand}-${this.price}`;
    return Buffer.from(hashData).toString('base64');
  }

  /**
   * Convert to search index format
   */
  toSearchIndex() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      brand: this.brand,
      features: this.features.join(' '),
      specifications: Object.values(this.specifications).join(' ')
    };
  }
}