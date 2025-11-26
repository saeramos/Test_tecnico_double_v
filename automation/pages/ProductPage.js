import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToCartButton = '#button-cart';
    this.cartButton = '#cart button';
    this.viewCartLink = 'a:has-text("View Cart")';
    this.productLink = (productName) => `.product-layout a:has-text("${productName}"), .product-thumb a:has-text("${productName}"), h4 a:has-text("${productName}")`;
    this.quantityInput = 'input[name="quantity"]';
    this.increaseQuantityButton = 'button[onclick*="quantity"]';
  }

  async clickProduct(productName) {
    await this.page.waitForSelector('.product-layout, .product-thumb', { timeout: 30000, state: 'visible' });
    await this.page.waitForTimeout(2000);
    
    const productLocator = this.page.locator(this.productLink(productName)).first();
    await productLocator.waitFor({ timeout: 30000, state: 'visible' });
    await productLocator.click();
    await this.page.waitForTimeout(3000);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {});
  }

  async addToCart() {
    await this.page.waitForSelector('#button-cart', { timeout: 30000, state: 'visible' });
    await this.page.click('#button-cart');
    await this.page.waitForTimeout(2000);
  }

  async goToCart() {
    await this.page.waitForSelector(this.cartButton, { timeout: 20000, state: 'visible' });
    await this.click(this.cartButton);
    await this.page.waitForTimeout(1000);
    
    try {
      const viewCartLink = this.page.locator(this.viewCartLink).first();
      await viewCartLink.waitFor({ timeout: 5000, state: 'visible' });
      await viewCartLink.click();
    } catch (error) {
      await this.page.goto('https://opencart.abstracta.us/index.php?route=checkout/cart');
    }
    await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
  }

  async updateQuantity(quantity) {
    await this.fill(this.quantityInput, quantity.toString());
    await this.page.waitForTimeout(500);
  }
}

