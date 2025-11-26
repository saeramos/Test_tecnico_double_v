import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = 'input[name="email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'input[type="submit"][value="Login"]';
    this.forgottenPasswordLink = 'a:has-text("Forgotten Password"), a[href*="forgotten"]';
    this.emailInputForgot = 'input[name="email"]';
    this.continueButton = 'input[type="submit"][value="Continue"]';
    this.successMessage = '.alert-success, .alert.alert-success';
  }

  async fillLoginForm(email, password) {
    await this.page.waitForSelector('input[name="email"]', { timeout: 30000, state: 'visible' });
    await this.page.fill('input[name="email"]', email);
    await this.page.waitForTimeout(500);
    await this.page.waitForSelector('input[name="password"]', { timeout: 30000, state: 'visible' });
    await this.page.fill('input[name="password"]', password);
    await this.page.waitForTimeout(500);
  }

  async submitLogin() {
    await this.page.waitForSelector(this.loginButton, { timeout: 25000, state: 'visible' });
    await this.click(this.loginButton);
    await this.page.waitForTimeout(3000);
  }

  async login(email, password) {
    await this.fillLoginForm(email, password);
    await this.submitLogin();
  }

  async goToForgottenPassword() {
    await this.click(this.forgottenPasswordLink);
    await this.waitForNavigation();
  }

  async requestPasswordReset(email) {
    await this.fill(this.emailInputForgot, email);
    await this.click(this.continueButton);
    await this.waitForNavigation();
  }

  async isPasswordResetSuccessful() {
    await this.page.waitForTimeout(2000);
    const successVisible = await this.isVisible(this.successMessage);
    if (successVisible) return true;
    
    return await this.page.locator('text=/email.*sent/i').isVisible().catch(() => false) ||
           await this.page.locator('text=/password.*reset/i').isVisible().catch(() => false);
  }
}

