import { expect, Page } from '@playwright/test';

export class Robot24Page {
  readonly page: Page;
  readonly url = 'https://robot24.com/';

  constructor(page: Page) {
    this.page = page;
  }

  get searchOpener() {
    return this.page.locator('.popup-search-opener');
  }

  get searchInput() {
    return this.page.locator('.popup-search-container input.search-field');
  }

  get searchButton() {
    return this.page.locator('.popup-search-container button.submit');
  }

  async open() {
    const response = await this.page.goto(this.url);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(this.page).toHaveURL(this.url);
    await expect(this.page).toHaveTitle(/.+/);
  }

  async openSearch() {
    await this.searchOpener.click();
    await expect(this.searchInput).toBeVisible();
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await expect(this.searchButton.locator('i.ri-search')).toBeVisible();
    await this.searchButton.click();
    await expect(this.page).toHaveURL(new RegExp(`robot24\\.com\\/?s=${term}`));
  }

}
