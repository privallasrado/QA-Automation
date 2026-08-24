import { test, expect } from '@playwright/test';

const robot24Url = 'https://robot24.com/';

test.describe('Robot24 homepage', () => {
  test('opens successfully', async ({ page }) => {
    const response = await page.goto(robot24Url);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(robot24Url);
    await expect(page).toHaveTitle(/.+/);

    await page.locator('.popup-search-opener').click();

    const searchInput = page.locator('.popup-search-container input.search-field');
    await expect(searchInput).toBeVisible();
    await searchInput.click();
    await expect(searchInput).toBeFocused();

    await searchInput.fill('collaborative');
    const searchButton = page.locator('.popup-search-container button.submit');
    await expect(searchButton.locator('i.ri-search')).toBeVisible();
    await searchButton.click();
    await expect(page).toHaveURL(/robot24\.com\/\?s=collaborative/);
  });
});