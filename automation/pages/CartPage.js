import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.removeButton = (productName) => `table tbody tr:has-text("${productName}") button[data-original-title="Remove"], table tbody tr:has-text("${productName}") button[title="Remove"], table tbody tr:has-text("${productName}") .fa-times`;
    this.quantityInput = (productName) => `table tbody tr:has-text("${productName}") input[name*="quantity"]`;
    this.updateButton = 'button[type="submit"]:has-text("Update")';
    this.checkoutButton = 'a:has-text("Checkout")';
    this.productRow = (productName) => `table tbody tr:has-text("${productName}")`;
  }

  async removeProduct(productName) {
    await this.page.waitForSelector('table tbody', { timeout: 30000, state: 'visible' });
    await this.page.waitForTimeout(2000);
    
    const removeBtn = this.page.locator(this.removeButton(productName)).first();
    await removeBtn.waitFor({ timeout: 30000, state: 'visible' });
    await removeBtn.click();
    await this.page.waitForTimeout(3000);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {});
  }

  async updateProductQuantity(productName, quantity) {
    const quantityInput = this.page.locator(this.quantityInput(productName)).first();
    await quantityInput.waitFor({ timeout: 20000, state: 'visible' });
    await quantityInput.fill(quantity.toString());
    await this.page.waitForTimeout(500);
    
    const updateBtn = this.page.locator(this.updateButton).first();
    await updateBtn.waitFor({ timeout: 20000, state: 'visible' });
    await updateBtn.click();
    await this.page.waitForTimeout(2000);
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch (error) {
      await this.page.waitForTimeout(2000);
    }
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
    await this.waitForNavigation();
  }

  async isProductInCart(productName) {
    return await this.isVisible(this.productRow(productName));
  }
}

