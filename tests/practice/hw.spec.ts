import test from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('Sign in button with CSS', async ({ page }) => {
    const signInButtonCSS = page.locator('button:has-text("Sign In")');
    await signInButtonCSS.highlight();
});

test('Sign in button with Xpath', async ({ page }) => {
    const signInButtonCSS = page.locator('//button[@class="btn btn-outline-white header_signin"]');
    await signInButtonCSS.highlight();
});

test('Sign in button with getByRole', async ({ page }) => {
    const signInButtonWithRole = page.getByRole('button', { name: 'Sign In' });
    await signInButtonWithRole.highlight();
});


test('Find elements in the header', async ({ page }) => {
    const header = page.locator('header');
    const headerHome = header.getByText('Home');
    await headerHome.highlight();

    const headerAbout= header.getByText('About');
    await headerAbout.highlight();

    const headerContacts = header.getByText('Contacts');
    await headerContacts.highlight();
});


//Teacher's example

test('Task 1: Find "Sign In" with different locators', async ({ page }) => {

  // Using CSS selector
  const signInByCss = page.locator('.header_signin');
  await signInByCss.highlight();

  // Using XPath selector
  const signInByXpath = page.locator('//button[contains(@class, "header_signin")]');
  await signInByXpath.highlight();

  // Using getByRole
  const signInByRole = page.getByRole('button', { name: 'Sign In' });
  await signInByRole.highlight();
});

test('Task 2: Find header navigation items', async ({ page }) => {

  const header = page.locator('header');

  const home = header.getByText('Home');
  await home.highlight();

  const about = header.getByText('About');
  await about.highlight();

  const contacts = header.getByText('Contacts');
  await contacts.highlight();
});