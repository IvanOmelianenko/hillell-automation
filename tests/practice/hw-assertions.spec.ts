import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});


test('Task 1: Sign In button visibility', async ({page}) => {
    const signInButton = await page.getByRole('button', { name: 'Sign In' });
    await expect(signInButton).toBeVisible();
});

test('Task 2: Check heading with text', async ({page}) => {
    const heading = await page.locator('.hero-descriptor .display-2');
    await expect(heading).toHaveText('Do more!');
});

test('Task 3: Check quantity of elements', async ({page}) => {
    const elements = await page.locator('img[alt="Instructions"]');
    await expect(elements).toHaveCount(2);
});

// Teacher's example

test.describe('Homework Assertions', () => {

  test('Task 1: Sign In button is visible', async ({ page }) => {
    const signIn = page.getByRole('button', { name: 'Sign In' });
    await expect(signIn).toBeVisible();
  });

test('Task 2: Hero heading has exact text', async ({ page }) => {
    const hero = page.locator('h1');
    await expect(hero).toHaveText('Do more!');
});

test('Task 3: Images with alt="instructions" count is 2', async ({ page }) => {
    const images = page.getByAltText('Instructions');
    await expect(images).toHaveCount(2);
});
})