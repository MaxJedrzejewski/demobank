import { test, expect } from '@playwright/test';

test.describe('login tests', () => {
  test('User login with correct credentials and checks username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerlo');
    await page.getByTestId('password-input').fill('345g3ggd');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('user-name')).toContainText('Jan Demobankowy');
  });

  test('User login with incorrect credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').fill('asdsadad');
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

});