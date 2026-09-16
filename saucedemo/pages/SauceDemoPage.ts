import { expect, Page } from '@playwright/test';

export class SauceDemoPage {
  readonly page: Page;
  readonly url = 'https://www.saucedemo.com/';

  constructor(page: Page) {
    this.page = page;
  }

  // Login locators
  get usernameInput() {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  // Inventory locators
  get applicationLogo() {
    return this.page.locator('.app_logo');
  }

  get inventoryItemName() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  get bikeLightItem() {
    return this.inventoryItemName.filter({ hasText: /^Sauce Labs Bike Light$/ });
  }

  get addBikeLightButton() {
    return this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get shoppingCartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  // Cart locators
  get cartItemName() {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  get bikeLightInCart() {
    return this.cartItemName.filter({ hasText: /^Sauce Labs Bike Light$/ });
  }

  get checkoutButton() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }

  get checkoutInformationTitle() {
    return this.page.getByText('Checkout: Your Information', { exact: true });
  }

  get firstNameInput() {
    return this.page.getByLabel('First Name');
  }

  get lastNameInput() {
    return this.page.getByLabel('Last Name');
  }

  get postalCodeInput() {
    return this.page.getByLabel('Zip/Postal Code');
  }

  get continueButton() {
    return this.page.getByRole('button', { name: 'Continue' });
  }

  // Order overview locators
  get paymentInformationValue() {
    return this.page.locator('[data-test="payment-info-value"]');
  }

  get shippingInformationValue() {
    return this.page.locator('[data-test="shipping-info-value"]');
  }

  get totalValue() {
    return this.page.locator('[data-test="total-label"]');
  }

  get finishButton() {
    return this.page.getByRole('button', { name: 'Finish' });
  }

  get checkoutCompleteTitle() {
    return this.page.getByText('Checkout: Complete!', { exact: true });
  }

  get checkoutCompleteContainer() {
    return this.page.locator('[data-test="checkout-complete-container"]');
  }

  get thankYouMessage() {
    return this.page.getByText('Thank you for your order!', { exact: true });
  }

  async open() {
    const response = await this.page.goto(this.url);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(this.page).toHaveURL(this.url);
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async login(username: string, password: string) {
    await this.open();

    await expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(username);
    await expect(this.usernameInput).toHaveValue(username);
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
  }

  async verifyLoggedInSuccessfully() {
    await expect(this.applicationLogo).toHaveText('Swag Labs');
  }

  async addBikeLightToCart() {
    await expect(this.bikeLightItem).toBeVisible();
    await expect(this.addBikeLightButton).toHaveText('Add to cart');
    await this.addBikeLightButton.click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async openShoppingCart() {
    await this.shoppingCartLink.click();
    await expect(this.page).toHaveURL(/\/cart\.html$/);
  }

  async verifyBikeLightIsInCart() {
    await expect(this.bikeLightInCart).toBeVisible();
  }

  async proceedToCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.checkoutInformationTitle).toBeVisible();
  }

  async enterFirstName(firstName: string) {
    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(firstName);
    await expect(this.firstNameInput).toHaveValue(firstName);
  }

  async enterLastName(lastName: string) {
    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(lastName);
    await expect(this.lastNameInput).toHaveValue(lastName);
  }

  async enterPostalCode(postalCode: string) {
    await expect(this.postalCodeInput).toBeVisible();
    await this.postalCodeInput.fill(postalCode);
    await expect(this.postalCodeInput).toHaveValue(postalCode);
  }

  async continueToOrderOverview() {
    await expect(this.continueButton).toBeVisible();
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
  }

  async verifyOrderSummary(
    paymentInformation: string,
    shippingInformation: string,
    total: string,
  ) {
    await expect(this.paymentInformationValue).toHaveText(paymentInformation);
    await expect(this.shippingInformationValue).toHaveText(shippingInformation);
    await expect(this.totalValue).toHaveText(total);
  }

  async finishOrder() {
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.checkoutCompleteTitle).toBeVisible();
  }

  async verifyOrderCompletionPage() {
    await expect(this.checkoutCompleteContainer).toBeVisible();
    await expect(this.thankYouMessage).toBeVisible();
  }
}
