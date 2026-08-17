import { test, expect } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignUpFormMy } from '../../pom/forms/SignUpFormMy';
import { generateInvalidName, generateInvalidNameMaxChars, generateInvalidNameMinChars, generateNameWithSpace, generateWrongEmailFormat } from '../../utils/data/credentials';
import { generatePassword } from '../../utils/data/password';
import { GaragePage } from '../../pom/pages/GaragePage';


test.describe('Registration tests', () => {
let homePage: HomePage;
let signUpFormMy: SignUpFormMy;
let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  signUpFormMy = new SignUpFormMy(page);
  garagePage = new GaragePage(page);

  await homePage.navigate();
  await homePage.openSignUpForm();
});

test.describe('Field name validation', () => {
    test('Registration with empty first name field', async ({ page }) => {
    await signUpFormMy.triggerFirstNameValidation();
    await expect(signUpFormMy.emptyFirstNameMessage).toBeVisible();
  });
    test ('Registration with invalid first name field', async ({ page }) => {
    await signUpFormMy.enterFirstName(generateInvalidName());
    await signUpFormMy.triggerFirstNameValidation();
    await expect(signUpFormMy.invalidFirstNameMessage).toBeVisible();
    });
    test('Registration with 1 character name field', async ({ page }) => {
    await signUpFormMy.enterFirstName(generateInvalidNameMinChars());
    await signUpFormMy.triggerFirstNameValidation();
    await expect(signUpFormMy.invalidFirstNameCharsMessage).toBeVisible();
    });
    test('Registration with more than 20 characters name field', async ({ page }) => {
    await signUpFormMy.enterFirstName(generateInvalidNameMaxChars());
    await signUpFormMy.triggerFirstNameValidation();
    await expect(signUpFormMy.invalidFirstNameCharsMessage).toBeVisible();  
    });
    test('Registration with space in name field', async ({ page }) => {
    await signUpFormMy.enterFirstName(generateNameWithSpace());
    await signUpFormMy.triggerFirstNameValidation();
    await expect(signUpFormMy.invalidFirstNameMessage).toBeVisible();
    });
    test('Check border color in name field', async ({ page }) => {
    await signUpFormMy.enterFirstName(generateInvalidName());
    await signUpFormMy.triggerFirstNameValidation();
    await signUpFormMy.checkBorderColor(signUpFormMy.firstNameField);
    });
});

test.describe('Field last name validation', () => {
    test('Registration with empty last name field', async ({ page }) => {
    await signUpFormMy.triggerLastNameValidation();
    await expect(signUpFormMy.emptyLastNameMessage).toBeVisible();
    });
    test ('Registration with invalid last name field', async ({ page }) => {
    await signUpFormMy.enterLastName(generateInvalidName());
    await signUpFormMy.triggerLastNameValidation();
    await expect(signUpFormMy.invalidLastNameMessage).toBeVisible();
    });
    test('Registration with 1 character last name field', async ({ page }) => {
    await signUpFormMy.enterLastName(generateInvalidNameMinChars());
    await signUpFormMy.triggerLastNameValidation();
    await expect(signUpFormMy.invalidLastNameCharsMessage).toBeVisible();
    });
    test('Registration with more than 20 characters last name field', async ({ page }) => {
    await signUpFormMy.enterLastName(generateInvalidNameMaxChars());
    await signUpFormMy.triggerLastNameValidation();
    await expect(signUpFormMy.invalidLastNameCharsMessage).toBeVisible();  
    });
    test('Registration with space in last name field', async ({ page }) => {
    await signUpFormMy.enterLastName(generateNameWithSpace());
    await signUpFormMy.triggerLastNameValidation();
    await expect(signUpFormMy.invalidLastNameMessage).toBeVisible();
    });
    test('Check border color in last name field', async ({ page }) => {
    await signUpFormMy.enterLastName(generateInvalidName());
    await signUpFormMy.triggerLastNameValidation();
    await signUpFormMy.checkBorderColor(signUpFormMy.lastNameField);
    });
});

test.describe('Field email validation', () => {
    test('Registration with invalid email field', async ({ page }) => {
    await signUpFormMy.enterEmail(generateWrongEmailFormat());
    await signUpFormMy.triggerEmailValidation();
    await expect(signUpFormMy.wrongEmailFormatMessage).toBeVisible();
    });
    test('Registration with empty email field', async ({ page }) => {
    await signUpFormMy.triggerEmailValidation();
    await expect(signUpFormMy.emptyEmailMessage).toBeVisible();
    });
    test('Check border color in email field', async ({ page }) => {
    await signUpFormMy.triggerEmailValidation();
    await signUpFormMy.checkBorderColor(signUpFormMy.emailField);  
    });
});
test.describe('Password field validation', () => {
    test('Registration with password field less than 8 characters', async ({ page }) => {
    await signUpFormMy.enterPassword(generatePassword('short'));
    await signUpFormMy.triggerPasswordValidation();
    await expect(signUpFormMy.invalidPasswordMessage).toBeVisible();
    });
    test('Registration with password field more than 15 characters', async ({ page }) => {
    await signUpFormMy.enterPassword(generatePassword('long'));  
    await signUpFormMy.triggerPasswordValidation();
    await expect(signUpFormMy.invalidPasswordMessage).toBeVisible();
    });
    test('Registration with password field without integer character', async ({ page }) => {
    await signUpFormMy.enterPassword(generatePassword('noDigit'));
    await signUpFormMy.triggerPasswordValidation();
    await expect(signUpFormMy.invalidPasswordMessage).toBeVisible();
    });
    test('Registration with password field without small character', async ({ page }) => {
    await signUpFormMy.enterPassword(generatePassword('noLower'));
    await signUpFormMy.triggerPasswordValidation();
    await expect(signUpFormMy.invalidPasswordMessage).toBeVisible();
    });
    test('Registration with password field without capital character', async ({ page }) => {
    await signUpFormMy.enterPassword(generatePassword('noUpper'));
    await signUpFormMy.triggerPasswordValidation();
    await expect(signUpFormMy.invalidPasswordMessage).toBeVisible();
    });
    test('Registration with empty password field ', async ({ page }) => {
    await signUpFormMy.triggerPasswordValidation();
    await expect(signUpFormMy.emptyPasswordMessage).toBeVisible();
    });
    test('Check border color in password field ', async ({ page }) => {
      await signUpFormMy.triggerPasswordValidation();
      await signUpFormMy.checkBorderColor(signUpFormMy.passwordField);
    });
  });

  test.describe('Re-enter password field validation', () => {
    test('Registration if re-enter password field do not match', async ({ page }) => {
      await signUpFormMy.enterPassword(generatePassword());
      await signUpFormMy.enterRepeatPassword(generatePassword());
      await signUpFormMy.triggerRepeatPasswordValidation();
      await expect(signUpFormMy.passwordNotMatchMessage).toBeVisible();
    });
    test('Registration with empty re-enter password field', async ({ page }) => {
      await signUpFormMy.triggerRepeatPasswordValidation();
      await expect(signUpFormMy.repeatEmptyPasswordMessage).toBeVisible();
    });
    test('Check border color in re-enter password field', async ({ page }) => {
      await signUpFormMy.triggerRepeatPasswordValidation();
      await signUpFormMy.checkBorderColor(signUpFormMy.repeatPasswordField);
    });
  });
  test.describe('Complete registration', () => {
    test('Registration with valid data', async ({ page }) => {
    await signUpFormMy.signUpWithCredentials();
    await expect(garagePage.pageHeading).toBeVisible();
  });
  test('Registration with invalid data', async ({ page }) => {
    await signUpFormMy.fillFields('John!')
    await expect(signUpFormMy.registerButton).toBeDisabled();
  });
});  
});