import { expect, Page } from '@playwright/test';
import { QaPlaygroundLocators } from '../locators/QaPlaygroundLocators';

export class QaPlaygroundActions {
  private readonly locators: QaPlaygroundLocators;
  private readonly homeUrl = 'https://qaplayground.com/';
  private readonly inputFieldsUrl = new URL('/practice/input-fields', this.homeUrl).toString();

  constructor(private readonly page: Page) {
    this.locators = new QaPlaygroundLocators(page);
  }

  async open() {
    const response = await this.page.goto(this.homeUrl);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(this.page).toHaveTitle(/QA Playground/);
    await expect(this.locators.mainHeading).toBeVisible();
  }

  async openPracticeArea() {
    await expect(this.locators.startPracticingLink).toBeVisible();
    await this.locators.startPracticingLink.click();
    await expect(this.page).toHaveURL(/qaplayground\.com\/practice\/?$/);
  }

  async openInputFieldsPractice() {
    const response = await this.page.goto(this.inputFieldsUrl);

    expect(response).not.toBeNull();
    expect(response?.status()).toBeLessThan(400);
    await expect(this.page).toHaveURL(this.inputFieldsUrl);
    await expect(this.locators.inputFieldsHeading).toBeVisible();
  }

  async verifyAppendValueAfterTab() {
    await expect(this.locators.appendTextInput).toBeVisible();
    const inputValue = await this.locators.appendTextInput.inputValue();

    await this.locators.appendTextInput.focus();
    await this.locators.appendTextInput.press('Tab');
    await expect(this.locators.appendTextResult).toHaveText(`Current value: ${inputValue}`);
  }

  async verifyReadValueResult() {
    await expect(this.locators.readValueInput).toBeVisible();
    const inputValue = await this.locators.readValueInput.inputValue();

    await this.locators.readValueButton.click();
    await expect(this.locators.readValueResult).toHaveText(`Value: ${inputValue}`);
  }

  async verifyClearField() {
    await expect(this.locators.clearFieldInput).toBeVisible();
    const initialValue = await this.locators.clearFieldInput.inputValue();
    expect(initialValue).not.toBe('');

    await this.locators.clearFieldButton.click();
    await expect(this.locators.clearFieldResult).toContainText('Field cleared');
    await expect(this.locators.clearFieldInput).toHaveValue('');
  }

  async verifyInputIsDisabled() {
    await expect(this.locators.disabledInput).toBeDisabled();
    await expect(this.locators.disabledInputResult).toContainText('Input is disabled');
  }

  async verifyInputIsReadonly() {
    await expect(this.locators.readonlyInput).toHaveAttribute('readonly', '');
    const inputValue = await this.locators.readonlyInput.inputValue();
    expect(inputValue).not.toBe('');
    await expect(this.locators.readonlyInputResult).toContainText(
      'value can be read but not edited',
    );
  }
}