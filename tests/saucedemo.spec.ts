import { test, expect } from '@playwright/test';

const sauceDemoUrl = 'https://www.saucedemo.com/';

test.describe('Sauce Demo login page', () => {
  test('opens successfully', async ({ page }) => {
    const response = await page.goto(sauceDemoUrl);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(sauceDemoUrl);
    await expect(page).toHaveTitle(/Swag Labs/);
    const usernameInput = page.locator('[data-test="username"]');
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill('standard_user');
    await expect(usernameInput).toHaveValue('standard_user');
    const passwordInput = page.locator('[data-test="password"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('secret_sauce');
    await expect(passwordInput).toHaveValue('secret_sauce');
    const loginButton = page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    const bikeLight = page.locator('[data-test="inventory-item-name"]', {
      hasText: 'Sauce Labs Bike Light',
    });
    await expect(bikeLight).toBeVisible();
    const addBikeLightButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(addBikeLightButton).toHaveText('Add to cart');
    await addBikeLightButton.click();
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(
      page.locator('[data-test="inventory-item-name"]').filter({ hasText: /^Sauce Labs Bike Light$/ }),
    ).toBeVisible();
  });
});