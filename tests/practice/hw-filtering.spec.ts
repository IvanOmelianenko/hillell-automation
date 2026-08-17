import test from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});


test('All buttons', async ({ page }) => {
    const buttons = await page.getByRole('button').all();
    const count = await buttons.length;
    console.log('Buttons count:', count);
});

test('Button has text', async ({ page }) => {
    const buttons = await page.getByRole('button').filter({ hasText: 'Sign In' }).highlight();
});

// From the teacher's example

test('Task: Count all buttons on the page', async ({ page }) => {
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    console.log('Buttons count:', count);
});

test('Task: Filter buttons by text (hasText) and highlight them', async ({ page }) => {
    const buttons = page.getByRole('button');
    const signIn = buttons.filter({ hasText: 'Sign In' });
    await signIn.highlight();
});