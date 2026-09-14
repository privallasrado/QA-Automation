import { test, expect } from '@playwright/test';

const robot24Url = 'https://robot24.com/';

test.describe('Robot24 homepage', () => {
  test('opens successfully', async ({ page }) => {
    const response = await page.goto(robot24Url);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveURL(robot24Url);
    await expect(page).toHaveTitle(/.+/);

    const search = page.getByRole('search');
    const searchInput = search.getByRole('combobox', {
      name: 'Search articles and videos across Robot24.com',
    });
    await expect(searchInput).toBeVisible();
    await searchInput.click();
    await expect(searchInput).toBeFocused();

    await searchInput.fill('collaborative');
    const searchButton = search.getByRole('button', { name: 'Search' });
    await searchButton.click();
    await expect(page).toHaveURL(/robot24\.com\/search\?q=collaborative/);
  });
});