import test from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('Filter hasText', async ({ page }) => {
    page.locator('//button').filter({ hasText: 'Sign' });
    page.getByRole('button').filter({ hasText: 'Sign' });
    page.locator('//button', { hasText: 'Sign In' });
    page.getByRole('button', { name: 'Sign up' });
});

test('Filter hasNotText', async ({ page }) => {
    page.locator('//button').filter({ hasNotText: 'Sign' });
});


test('.filter has', ({ page }) => {
    page.locator('//a').filter({ has: page.locator('span.icon-telegram') }).click();    
})

test('.filter hasNot', ({ page }) => {
    page.locator('//a').filter({ hasNot: page.locator('span.icon-telegram') }).click();    
})

test('.locator.locator', ({ page }) => {
    page.locator('//nav').locator('//a').click();   
})

