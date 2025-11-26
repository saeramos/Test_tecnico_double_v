import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = 'input[name="firstname"]';
    this.lastNameInput = 'input[name="lastname"]';
    this.emailInput = 'input[name="email"]';
    this.telephoneInput = 'input[name="telephone"]';
    this.addressInput = 'input[name="address_1"]';
    this.cityInput = 'input[name="city"]';
    this.postCodeInput = 'input[name="postcode"]';
    this.countrySelect = 'select[name="country_id"]';
    this.regionSelect = 'select[name="zone_id"]';
    this.continueButton = 'input[type="button"][value="Continue"]';
    this.confirmOrderButton = 'input[type="button"][id="button-confirm"]';
    this.successMessage = 'h1:has-text("Your order has been placed!")';
    this.orderSuccessMessage = '.page-title:has-text("Your order has been placed!")';
  }

  async fillBillingDetails(customerData) {
    if (await this.isVisible(this.firstNameInput)) {
      await this.fill(this.firstNameInput, customerData.firstName);
      await this.fill(this.lastNameInput, customerData.lastName);
      await this.fill(this.emailInput, customerData.email);
      await this.fill(this.telephoneInput, customerData.telephone);
      await this.fill(this.addressInput, customerData.address);
      await this.fill(this.cityInput, customerData.city);
      await this.fill(this.postCodeInput, customerData.postCode);
      
      if (await this.isVisible(this.countrySelect)) {
        await this.page.selectOption(this.countrySelect, customerData.country);
        await this.page.waitForTimeout(1000);
      }
      
      if (await this.isVisible(this.regionSelect)) {
        await this.page.selectOption(this.regionSelect, customerData.region);
        await this.page.waitForTimeout(1000);
      }
    }
  }

  async continueToNextStep() {
    const continueButtons = await this.page.locator(this.continueButton).all();
    if (continueButtons.length > 0) {
      await continueButtons[0].click();
      await this.page.waitForTimeout(2000);
    }
  }

  async completeAllSteps(customerData) {
    await this.fillBillingDetails(customerData);
    await this.continueToNextStep();
    
    await this.page.waitForTimeout(2000);
    await this.continueToNextStep();
    
    await this.page.waitForTimeout(2000);
    await this.continueToNextStep();
    
    await this.page.waitForTimeout(2000);
    
    if (await this.isVisible(this.confirmOrderButton)) {
      await this.click(this.confirmOrderButton);
      await this.waitForNavigation();
    }
  }

  async isOrderConfirmed() {
    await this.page.waitForTimeout(3000);
    return await this.isVisible(this.orderSuccessMessage) || 
           await this.isVisible(this.successMessage) ||
           await this.page.locator('text=/order.*placed/i').isVisible();
  }
}

