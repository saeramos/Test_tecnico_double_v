export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async click(selector) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ timeout: 10000, state: 'visible' });
    await locator.click();
  }

  async fill(selector, text) {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ timeout: 10000, state: 'visible' });
    await locator.fill(text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async waitForNavigation() {
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch (error) {
      await this.page.waitForLoadState('load', { timeout: 10000 });
    }
  }
}

