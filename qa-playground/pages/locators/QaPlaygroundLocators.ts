import { Page } from '@playwright/test';

export class QaPlaygroundLocators {
  constructor(private readonly page: Page) {}

  get mainHeading() {
    return this.page.getByRole('heading', {
      name: 'The Only Automation Playground You Need to Practice',
      level: 1,
    });
  }

  get startPracticingLink() {
    return this.page.getByTestId('hero-start-practicing');
  }

  get inputFieldsHeading() {
    return this.page.getByRole('heading', { name: 'Input Field Automation Practice' });
  }

  get appendTextInput() {
    return this.page.getByRole('textbox', { name: 'Append text and press Tab' });
  }

  get appendTextResult() {
    return this.page.getByTestId('result-s02');
  }

  get readValueInput() {
    return this.page.getByRole('textbox', { name: 'Field with a value to read' });
  }

  get readValueButton() {
    return this.page.getByRole('button', { name: 'Read Value', exact: true });
  }

  get readValueResult() {
    return this.page.getByTestId('result-s03');
  }

  get clearFieldInput() {
    return this.page.getByRole('textbox', { name: 'Field to clear' });
  }

  get clearFieldButton() {
    return this.page.getByRole('button', { name: 'Clear', exact: true });
  }

  get clearFieldResult() {
    return this.page.getByTestId('result-s04');
  }

  get disabledInput() {
    return this.page.getByRole('textbox', { name: 'Disabled input' });
  }

  get disabledInputResult() {
    return this.page.getByTestId('result-s05');
  }

  get readonlyInput() {
    return this.page.getByRole('textbox', { name: 'Readonly input' });
  }

  get readonlyInputResult() {
    return this.page.getByTestId('result-s06');
  }
}