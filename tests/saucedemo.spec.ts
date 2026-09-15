import { test } from '../fixtures/pages';
import { sauceDemoTestData } from '../utils/testData';

test.describe('Sauce Demo shopping journey', () => {
  test('a customer can log in and add a product to the shopping cart', async ({ sauceDemoPage }) => {
    await sauceDemoPage.login(
      sauceDemoTestData.standardUser.username,
      sauceDemoTestData.standardUser.password,
    );
    await sauceDemoPage.verifyLoggedInSuccessfully();
    await sauceDemoPage.addBikeLightToCart();
    await sauceDemoPage.openShoppingCart();
    await sauceDemoPage.verifyBikeLightIsInCart();
  });
});