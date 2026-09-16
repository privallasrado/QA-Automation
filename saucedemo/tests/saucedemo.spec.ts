import { test } from '../fixtures/pages';
import { sauceDemoTestData } from '../utils/testData';

test.describe('Sauce Demo shopping journey', () => {
  test('a customer can log in, add a product, and start checkout', async ({ sauceDemoPage }) => {
    await sauceDemoPage.login(
      sauceDemoTestData.standardUser.username,
      sauceDemoTestData.standardUser.password,
    );
    await sauceDemoPage.verifyLoggedInSuccessfully();
    await sauceDemoPage.addBikeLightToCart();
    await sauceDemoPage.openShoppingCart();
    await sauceDemoPage.verifyBikeLightIsInCart();
    await sauceDemoPage.proceedToCheckout();
    await sauceDemoPage.enterFirstName(sauceDemoTestData.checkout.firstName);
    await sauceDemoPage.enterLastName(sauceDemoTestData.checkout.lastName);
    await sauceDemoPage.enterPostalCode(sauceDemoTestData.checkout.postalCode);
    await sauceDemoPage.continueToOrderOverview();
    await sauceDemoPage.verifyOrderSummary(
      sauceDemoTestData.checkout.paymentInformation,
      sauceDemoTestData.checkout.shippingInformation,
      sauceDemoTestData.checkout.total,
    );
    await sauceDemoPage.finishOrder();
    await sauceDemoPage.verifyOrderCompletionPage();
  });
});
