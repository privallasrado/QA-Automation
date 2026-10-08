import { test as base } from '@playwright/test';
import { QaPlaygroundActions } from '../pages/actions/QaPlaygroundActions';

interface QaPlaygroundFixtures {
  qaPlayground: QaPlaygroundActions;
  inputFieldsPractice: QaPlaygroundActions;
}

export const test = base.extend<QaPlaygroundFixtures>({
  qaPlayground: async ({ page }, use) => {
    await use(new QaPlaygroundActions(page));
  },

  inputFieldsPractice: async ({ qaPlayground }, use) => {
    await qaPlayground.openInputFieldsPractice();
    await use(qaPlayground);
  },
});

export { expect } from '@playwright/test';