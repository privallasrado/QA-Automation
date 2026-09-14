import { expect, Page } from '@playwright/test';

export class Robot24Page {
  readonly page: Page;
  readonly url = 'https://robot24.com/';

  constructor(page: Page) {
    this.page = page;
  }

  get searchOpener() {
    return this.page.getByRole('search');
  }

  get searchInput() {
    return this.searchOpener.getByRole('combobox', {
      name: 'Search articles and videos across Robot24.com',
    });
  }

  get searchButton() {
    return this.searchOpener.getByRole('button', { name: 'Search' });
  }

  async open() {
    const response = await this.page.goto(this.url);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(this.page).toHaveURL(this.url);
    await expect(this.page).toHaveTitle(/.+/);
  }

  async openSearch() {
    await expect(this.searchInput).toBeVisible();
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await expect(this.page).toHaveURL(new RegExp(`robot24\\.com\\/search\\?q=${term}`));
  }

}
