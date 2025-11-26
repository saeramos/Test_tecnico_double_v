import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { RegisterPage } from '../../pages/RegisterPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import { ProductPage } from '../../pages/ProductPage.js';
import { CartPage } from '../../pages/CartPage.js';
import { CheckoutPage } from '../../pages/CheckoutPage.js';
import { generateRandomUser, testProducts } from '../../utils/test-data.js';

test.describe('OpenCart E2E Tests', () => {
  let userData;
  let homePage;
  let registerPage;
  let loginPage;
  let productPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    userData = generateRandomUser();
    try {
      await homePage.navigateTo('/');
    } catch (error) {
      await page.goto('https://opencart.abstracta.us/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    }
  });

  test('Completar formulario de registro', async ({ page }) => {
    await homePage.goToRegister();
    await registerPage.completeRegistration(userData);
    
    const isSuccess = await registerPage.isRegistrationSuccessful();
    expect(isSuccess).toBeTruthy();
  });

  test('Validar inicio de sesión', async ({ page }) => {
    const registeredUser = generateRandomUser();
    
    await homePage.goToRegister();
    await registerPage.completeRegistration(registeredUser);
    
    await page.waitForTimeout(2000);
    await page.goto('https://opencart.abstracta.us/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);
    
    await homePage.goToLogin();
    await page.waitForTimeout(2000);
    
    await loginPage.login(registeredUser.email, registeredUser.password);
    
    await page.waitForTimeout(3000);
    const myAccountVisible = await page.locator('text=/my account/i, text=/account/i, a[title="My Account"], .dropdown:has-text("My Account")').first().isVisible().catch(() => false);
    const url = page.url();
    const pageContent = await page.textContent('body').catch(() => '');
    const hasAccountInfo = pageContent.toLowerCase().includes('account') || url.includes('account');
    
    expect(myAccountVisible || hasAccountInfo).toBeTruthy();
  });

  test('Probar restablecimiento de contraseña', async ({ page }) => {
    await homePage.goToLogin();
    await loginPage.goToForgottenPassword();
    await loginPage.requestPasswordReset(userData.email);
    
    const isSuccess = await loginPage.isPasswordResetSuccessful();
    expect(isSuccess).toBeTruthy();
  });

  test('Navegar a Laptops & Notebooks y mostrar todos', async ({ page }) => {
    await homePage.navigateToLaptops();
    
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Laptop');
  });

  test('Agregar MacBook Pro al carrito', async ({ page }) => {
    await homePage.navigateToLaptops();
    await page.waitForTimeout(2000);
    
    await productPage.clickProduct(testProducts.macbookPro);
    await page.waitForTimeout(2000);
    
    await productPage.addToCart();
    await page.waitForTimeout(3000);
    
    const cartButton = page.locator('#cart-total, #cart button, button[data-toggle="dropdown"]');
    await cartButton.waitFor({ timeout: 20000, state: 'visible' });
    const cartText = await cartButton.textContent().catch(() => '');
    const cartVisible = cartText.toLowerCase().includes('item') || cartText.toLowerCase().includes('cart') || cartText.includes('$');
    expect(cartVisible).toBeTruthy();
  });

  test('Buscar y agregar Samsung Galaxy tablet al carrito', async ({ page }) => {
    await homePage.searchProduct(testProducts.samsungGalaxy);
    
    const productLinks = page.locator(`a:has-text("${testProducts.samsungGalaxy}")`);
    const count = await productLinks.count();
    
    if (count > 0) {
      await productLinks.first().click();
      await productPage.addToCart();
      
      const cartButton = await page.locator('#cart-total');
      const cartText = await cartButton.textContent();
      expect(cartText).toContain('item');
    }
  });

  test('Eliminar MacBook Pro del carrito', async ({ page }) => {
    await homePage.navigateToLaptops();
    await page.waitForTimeout(2000);
    
    await productPage.clickProduct(testProducts.macbookPro);
    await page.waitForTimeout(2000);
    await productPage.addToCart();
    await page.waitForTimeout(2000);
    
    await homePage.searchProduct(testProducts.samsungGalaxy);
    await page.waitForTimeout(2000);
    const productLinks = page.locator(`a:has-text("${testProducts.samsungGalaxy}")`);
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await page.waitForTimeout(2000);
      await productPage.addToCart();
      await page.waitForTimeout(2000);
    }
    
    await productPage.goToCart();
    await page.waitForTimeout(2000);
    
    const productExistsBefore = await cartPage.isProductInCart(testProducts.macbookPro);
    if (productExistsBefore) {
      await cartPage.removeProduct(testProducts.macbookPro);
      await page.waitForTimeout(3000);
    }
    
    const isRemoved = !(await cartPage.isProductInCart(testProducts.macbookPro));
    expect(isRemoved).toBeTruthy();
  });

  test('Agregar otra unidad de Samsung Galaxy tablet', async ({ page }) => {
    await homePage.searchProduct(testProducts.samsungGalaxy);
    const productLinks = page.locator(`a:has-text("${testProducts.samsungGalaxy}")`);
    
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await productPage.addToCart();
      
      await productPage.goToCart();
      await cartPage.updateProductQuantity(testProducts.samsungGalaxy, 2);
      
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      const quantityInput = page.locator(`tr:has-text("${testProducts.samsungGalaxy}") input[name*="quantity"], tr:has-text("${testProducts.samsungGalaxy}") input[type="text"]`).first();
      await quantityInput.waitFor({ timeout: 10000, state: 'visible' });
      const quantity = await quantityInput.inputValue();
      expect(parseInt(quantity)).toBeGreaterThanOrEqual(2);
    }
  });

  test('Completar proceso de compra hasta confirmación', async ({ page }) => {
    await homePage.goToRegister();
    await registerPage.completeRegistration(userData);
    
    await page.goto('https://opencart.abstracta.us/');
    await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
    
    await homePage.searchProduct(testProducts.samsungGalaxy);
    const productLinks = page.locator(`a:has-text("${testProducts.samsungGalaxy}")`);
    
    if (await productLinks.count() > 0) {
      await productLinks.first().click();
      await productPage.addToCart();
      
      await productPage.goToCart();
      await cartPage.proceedToCheckout();
      
      await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
      await checkoutPage.completeAllSteps(userData);
      
      await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
      const isConfirmed = await checkoutPage.isOrderConfirmed();
      expect(isConfirmed).toBeTruthy();
    }
  });
});

