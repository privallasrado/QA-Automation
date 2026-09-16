import { expect, Page } from '@playwright/test';

export class MarksAndSpencerPage {
  readonly page: Page;
  readonly fashionUrl = 'https://www.marksandspencer.ae/en/fashion';

  constructor(page: Page) {
    this.page = page;
  }

  get accountMenuTrigger() {
    return this.page.getByText('Hi there,', { exact: true }).locator('..');
  }

  get loginLink() {
    return this.page
      .locator('.tooltip-inner div.HeaderMenu_tooltip-link__nJFif')
      .filter({ hasText: /^Log in$/ });
  }

  get useEmailInstead() {
    return this.page.getByText('Use email instead', { exact: true });
  }

  get emailInput() {
    return this.page.locator('input#textField[type="email"]');
  }

  get passwordInput() {
    return this.page.locator('input#textField[type="password"]');
  }

  async openFashionPage() {
    const response = await this.page.goto(this.fashionUrl);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(this.page).toHaveURL(/www\.marksandspencer\.ae\/en\/fashion/);
    await expect(this.page).toHaveTitle(/.+/);
  }

  async clickLogin() {
    await this.accountMenuTrigger.hover();
    await expect(this.loginLink).toBeVisible();
    await this.loginLink.click();
  }

  async clickUseEmailInstead() {
    await expect(this.useEmailInstead).toBeVisible();
    await this.useEmailInstead.click();
  }

  async fillEmail(email: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }

  async fillPassword(password: string) {
    await expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
    await expect(this.passwordInput).toHaveValue(password);
  }
}
