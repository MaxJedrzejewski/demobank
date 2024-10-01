import { test, expect } from '@playwright/test';

test.describe('Dashboard tests', () => {
  test('User transfers money to someone', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testeerL');
    await page.getByTestId('password-input').fill('5345fsdf');
    await page.getByTestId('login-button').click();
    await expect(page.getByText('szybki przelew widżet umoż')).toBeVisible();
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('1000');
    await page.locator('#widget_1_transfer_title').fill('test przelew');
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await expect(page.getByRole('paragraph')).toContainText('Przelew wykonany!Odbiorca: Chuck DemobankowyKwota: 1000,00PLN Nazwa: test przelew');
  });

  test('User tops up the phone', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('username');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('20');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toContainText('Doładowanie wykonane! 20,00PLN na numer 500 xxx xxx'); 
  });


});