import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = '#input-firstname, input[name="firstname"]';
    this.lastNameInput = '#input-lastname, input[name="lastname"]';
    this.emailInput = '#input-email, input[name="email"]';
    this.telephoneInput = '#input-telephone, input[name="telephone"]';
    this.passwordInput = '#input-password, input[name="password"]';
    this.confirmPasswordInput = '#input-confirm, input[name="confirm"]';
    this.privacyPolicyCheckbox = 'input[name="agree"], input[type="checkbox"][name="agree"]';
    this.continueButton = 'input[type="submit"][value="Continue"], button:has-text("Continue")';
    this.successMessage = '.alert-success, .alert.alert-success';
  }

  async fillRegistrationForm(userData) {
    await this.fill(this.firstNameInput, userData.firstName);
    await this.fill(this.lastNameInput, userData.lastName);
    await this.fill(this.emailInput, userData.email);
    await this.fill(this.telephoneInput, userData.telephone);
    await this.fill(this.passwordInput, userData.password);
    await this.fill(this.confirmPasswordInput, userData.password);
  }

  async acceptPrivacyPolicy() {
    await this.click(this.privacyPolicyCheckbox);
  }

  async submitRegistration() {
    await this.click(this.continueButton);
    await this.page.waitForTimeout(3000);
  }

  async isRegistrationSuccessful() {
    await this.page.waitForTimeout(2000);
    const successVisible = await this.isVisible(this.successMessage);
    if (successVisible) return true;
    
    const pageTitle = await this.page.title();
    const url = this.page.url();
    return pageTitle.toLowerCase().includes('success') || 
           url.includes('success') || 
           await this.page.locator('text=/congratulations/i').isVisible().catch(() => false) ||
           await this.page.locator('text=/account created/i').isVisible().catch(() => false);
  }

  async completeRegistration(userData) {
    await this.fillRegistrationForm(userData);
    await this.acceptPrivacyPolicy();
    await this.submitRegistration();
  }
}

