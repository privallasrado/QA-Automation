import { test, expect } from '@playwright/test';

test.describe('Marks & Spencer UAE API checks', () => {
  test('fashion endpoint accepts a POST request', async ({ request }) => {
    const response = await request.post(
      'https://www.marksandspencer.ae/en/fashion?_rsc=1xi3f',
    );

    expect(response.ok()).toBe(true);
    expect(response.status()).toBeLessThan(400);
    expect(response.headers()['content-type']).toContain('text/html');
  });
});