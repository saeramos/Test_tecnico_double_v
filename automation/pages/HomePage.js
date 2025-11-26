import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = '#search input[name="search"], input[name="search"]';
    this.searchButton = '#search button, button.btn-default';
    this.myAccountDropdown = 'a[title="My Account"], .dropdown:has-text("My Account") a';
    this.registerLink = 'a:has-text("Register"), a[href*="account/register"]';
    this.loginLink = 'a:has-text("Login"), a[href*="account/login"]';
    this.laptopsMenu = 'a:has-text("Laptops & Notebooks"), a:has-text("Laptops")';
    this.showAllLaptops = 'a:has-text("Show All Laptops & Notebooks"), a.see-all';
  }

  async goToRegister() {
    try {
      const accountDropdown = this.page.locator(this.myAccountDropdown).first();
      await accountDropdown.waitFor({ timeout: 20000, state: 'visible' });
      await accountDropdown.click();
      await this.page.waitForTimeout(1000);
      
      const registerLink = this.page.locator(this.registerLink).first();
      await registerLink.waitFor({ timeout: 20000, state: 'visible' });
      await registerLink.click();
      await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    } catch (error) {
      await this.page.goto('https://opencart.abstracta.us/index.php?route=account/register');
      await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    }
  }

  async goToLogin() {
    try {
      const accountDropdown = this.page.locator(this.myAccountDropdown).first();
      await accountDropdown.waitFor({ timeout: 20000, state: 'visible' });
      await accountDropdown.click();
      await this.page.waitForTimeout(1000);
      
      const loginLink = this.page.locator(this.loginLink).first();
      await loginLink.waitFor({ timeout: 20000, state: 'visible' });
      await loginLink.click();
      await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    } catch (error) {
      await this.page.goto('https://opencart.abstracta.us/index.php?route=account/login');
      await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    }
  }

  async searchProduct(productName) {
    await this.fill(this.searchInput, productName);
    await this.page.keyboard.press('Enter');
    await this.waitForNavigation();
  }

  async navigateToLaptops() {
    try {
      const laptopsMenu = this.page.locator(this.laptopsMenu).first();
      await laptopsMenu.waitFor({ timeout: 20000, state: 'visible' });
      await laptopsMenu.hover();
      await this.page.waitForTimeout(1000);
      
      const showAllLink = this.page.locator(this.showAllLaptops).first();
      await showAllLink.waitFor({ timeout: 20000, state: 'visible' });
      await showAllLink.click();
      await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    } catch (error) {
      await this.page.goto('https://opencart.abstracta.us/index.php?route=product/category&path=18');
      await this.page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    }
  }

  async hover(selector) {
    await this.page.hover(selector);
  }
}

