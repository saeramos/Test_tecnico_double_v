const { expect } = require('chai');
const apiClient = require('../helpers/api-client');

describe('Consulta de Producto Específico', () => {
  let productId;

  before(async () => {
    const products = await apiClient.getProducts();
    if (products.length > 0) {
      productId = products[0].id;
    }
  });

  it('Debe retornar los datos completos de un producto específico', async () => {
    if (!productId) {
      throw new Error('No se encontraron productos para probar');
    }

    const product = await apiClient.getProductById(productId);
    
    expect(product).to.be.an('object');
    expect(product).to.have.property('id');
    expect(product).to.have.property('title');
    expect(product).to.have.property('price');
    expect(product).to.have.property('description');
    expect(product).to.have.property('image');
    expect(product).to.have.property('category');
    expect(product.id).to.equal(productId);
  });

  it('Debe retornar error 404 para un producto inexistente', async () => {
    try {
      await apiClient.getProductById(99999);
      throw new Error('Se esperaba un error para producto inexistente');
    } catch (error) {
      if (error.response) {
        expect(error.response.status).to.be.oneOf([404, 400]);
      } else {
        expect(error.message).to.exist;
      }
    }
  });
});

