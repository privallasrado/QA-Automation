import { test } from '../fixtures/pages';
import { marksAndSpencerCredentials } from '../utils/credentials';

test.describe('Marks & Spencer UAE fashion page', () => {
  test('opens the fashion page successfully', async ({ marksAndSpencerPage }) => {
    await marksAndSpencerPage.openFashionPage();
  });

  test('clicks Log in', async ({ marksAndSpencerPage }) => {
    await marksAndSpencerPage.openFashionPage();
    await marksAndSpencerPage.clickLogin();
    await marksAndSpencerPage.clickUseEmailInstead();
    await marksAndSpencerPage.fillEmail(marksAndSpencerCredentials.email);
    await marksAndSpencerPage.fillPassword(marksAndSpencerCredentials.password);
  });
});
