import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './api-tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'https://www.marksandspencer.ae',
  },
});