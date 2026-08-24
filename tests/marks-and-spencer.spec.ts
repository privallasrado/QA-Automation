import { test } from '@playwright/test';
import { MarksAndSpencerPage } from '../pages/MarksAndSpencerPage';
import { marksAndSpencerCredentials } from '../test-data/credentials';

test.describe('Marks & Spencer UAE fashion page', () => {
  test('opens the fashion page successfully', async ({ page }) => {
    const marksAndSpencerPage = new MarksAndSpencerPage(page);

    await marksAndSpencerPage.openFashionPage();
  });

  test('clicks Log in', async ({ page }) => {
    const marksAndSpencerPage = new MarksAndSpencerPage(page);

    await marksAndSpencerPage.openFashionPage();
    await marksAndSpencerPage.clickLogin();
    await marksAndSpencerPage.clickUseEmailInstead();
    await marksAndSpencerPage.fillEmail(marksAndSpencerCredentials.email);
    await marksAndSpencerPage.fillPassword(marksAndSpencerCredentials.password);
  });
});
