const { expect } = require('chai');
const apiClient = require('../helpers/api-client');

describe('Consulta de Productos por Categoría', () => {
  it('Debe retornar todos los productos de la categoría "electronics"', async () => {
    const products = await apiClient.getProductsByCategory('electronics');
    
    expect(products).to.be.an('array');
    expect(products.length).to.be.greaterThan(0);
    
    products.forEach(product => {
      expect(product).to.have.property('id');
      expect(product).to.have.property('title');
      expect(product).to.have.property('price');
      expect(product).to.have.property('category');
      expect(product.category).to.equal('electronics');
    });
  });

  it('Debe retornar productos con estructura válida', async () => {
    const products = await apiClient.getProductsByCategory('electronics');
    
    if (products.length > 0) {
      const firstProduct = products[0];
      expect(firstProduct).to.have.property('id');
      expect(firstProduct).to.have.property('title');
      expect(firstProduct).to.have.property('price');
      expect(firstProduct).to.have.property('description');
      expect(firstProduct).to.have.property('image');
      expect(firstProduct).to.have.property('category');
      expect(firstProduct.price).to.be.a('number');
      expect(firstProduct.price).to.be.greaterThan(0);
    }
  });
});

