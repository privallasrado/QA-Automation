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
}
