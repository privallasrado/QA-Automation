import { test } from '../fixtures/pages';

test.describe('QA Playground input fields', () => {
  test('completes input field scenarios end to end', async ({ inputFieldsPractice }) => {
    await test.step('append-field value is reported after pressing Tab', async () => {
      await inputFieldsPractice.verifyAppendValueAfterTab();
    });

    await test.step('readonly field value is reported when requested', async () => {
      await inputFieldsPractice.verifyReadValueResult();
    });

    await test.step('clear action empties its field', async () => {
      await inputFieldsPractice.verifyClearField();
    });

    await test.step('disabled field is identified correctly', async () => {
      await inputFieldsPractice.verifyInputIsDisabled();
    });

    await test.step('readonly field is identified as readable but not editable', async () => {
      await inputFieldsPractice.verifyInputIsReadonly();
    });
  });
});