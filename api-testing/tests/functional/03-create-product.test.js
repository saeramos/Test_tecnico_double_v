const { expect } = require('chai');
const apiClient = require('../helpers/api-client');

describe('Creación de Producto', () => {
  let createdProductId;
  const newProduct = {
    title: 'Test Product - Smart Watch Pro',
    price: 299.99,
    description: 'Advanced smartwatch with health monitoring features',
    image: 'https://example.com/smartwatch.jpg',
    category: 'electronics'
  };

  it('Debe crear un nuevo producto exitosamente', async () => {
    const response = await apiClient.createProduct(newProduct);
    
    expect(response).to.be.an('object');
    expect(response).to.have.property('id');
    expect(response.title).to.equal(newProduct.title);
    expect(response.price).to.equal(newProduct.price);
    expect(response.description).to.equal(newProduct.description);
    expect(response.category).to.equal(newProduct.category);
    
    createdProductId = response.id;
  });

  after(async () => {
    if (createdProductId) {
      try {
        await apiClient.deleteProduct(createdProductId);
      } catch (error) {
        console.log('No se pudo eliminar el producto de prueba');
      }
    }
  });
});

