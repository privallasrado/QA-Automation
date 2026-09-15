import { test as base } from '@playwright/test';
import { MarksAndSpencerPage } from '../pages/MarksAndSpencerPage';
import { SauceDemoPage } from '../pages/SauceDemoPage';

interface PageFixtures {
  marksAndSpencerPage: MarksAndSpencerPage;
  sauceDemoPage: SauceDemoPage;
}

export const test = base.extend<PageFixtures>({
  marksAndSpencerPage: async ({ page }, use) => {
    await use(new MarksAndSpencerPage(page));
  },
  sauceDemoPage: async ({ page }, use) => {
    await use(new SauceDemoPage(page));
  },
});

export { expect } from '@playwright/test';
