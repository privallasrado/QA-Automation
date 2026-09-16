import { test as base } from '@playwright/test';
import { SauceDemoPage } from '../pages/SauceDemoPage';

interface PageFixtures {
  sauceDemoPage: SauceDemoPage;
}

export const test = base.extend<PageFixtures>({
  sauceDemoPage: async ({ page }, use) => {
    await use(new SauceDemoPage(page));
  },
});

export { expect } from '@playwright/test';
