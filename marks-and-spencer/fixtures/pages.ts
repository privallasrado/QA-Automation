import { test as base } from '@playwright/test';
import { MarksAndSpencerPage } from '../pages/MarksAndSpencerPage';

interface PageFixtures {
  marksAndSpencerPage: MarksAndSpencerPage;
}

export const test = base.extend<PageFixtures>({
  marksAndSpencerPage: async ({ page }, use) => {
    await use(new MarksAndSpencerPage(page));
  },
});

export { expect } from '@playwright/test';
