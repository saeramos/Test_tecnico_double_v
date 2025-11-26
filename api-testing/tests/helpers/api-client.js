const axios = require('axios');

const BASE_URL = 'https://fakestoreapi.com';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getProducts() {
    const response = await this.client.get('/products');
    return response.data;
  }

  async getProductById(id) {
    const response = await this.client.get(`/products/${id}`);
    return response.data;
  }

  async getProductsByCategory(category) {
    const response = await this.client.get(`/products/category/${category}`);
    return response.data;
  }

  async createProduct(productData) {
    const response = await this.client.post('/products', productData);
    return response.data;
  }

  async updateProduct(id, productData) {
    const response = await this.client.put(`/products/${id}`, productData);
    return response.data;
  }

  async deleteProduct(id) {
    const response = await this.client.delete(`/products/${id}`);
    return response.data;
  }
}

module.exports = new ApiClient();

