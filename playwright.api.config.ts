import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './api-tests',
  fullyParallel: true,
  reporter: [['html', { outputFolder: 'playwright-report/api', open: 'never' }]],
  use: {
    baseURL: 'https://www.marksandspencer.ae',
  },
});