// 1. Change name
// 2. Change last name
// 3. Add photo
// 4. Add country
// 5. Add Birthdate
// 6. Validation - empty name
// 7. Validation - empty last name
// 8. Validation - empty country

import { expect, test } from "../utils/fixtures/pagesFixtures";
import { faker } from "@faker-js/faker";
import { testUser2 } from "../test-data/validUsers";



test.describe("Editing Profile tests", () => {

  test.use({ storageState: ".states/testuser2.json" });

  test.beforeEach(async ({ app }) => {
    await app.profilePage.navigate();
    await app.profilePage.openEditProfileForm();
  });
  
  test('Change name', async ({ app }) => {
    const newName = faker.person.firstName();

    await app.editProfileForm.enterName(newName);
    await app.editProfileForm.clickSaveButton();
    await expect(app.profilePage.profileName).toContainText(newName);
  });

   test('Change last name', async ({ app }) => {
    const lastName = faker.person.lastName();

    await app.editProfileForm.enterLastName(lastName);
    await app.editProfileForm.clickSaveButton();
    await expect(app.profilePage.profileName).toContainText(lastName);
  });

   test('Add photo', async ({ app }) => {
    const photoPath = './test-data/images/photo-icon.jpeg';

    await app.editProfileForm.addPhoto(photoPath);
    await app.editProfileForm.clickSaveButton();
    await expect(app.profilePage.profilePhoto).not.toHaveAttribute('src', 'https://qauto.forstudy.space/public/images/users/default-user.jpg');
    
  });

   test('Add country', async ({ app }) => {
    const country = 'newCountry';

    await app.editProfileForm.enterCountry(country);
    await app.editProfileForm.clickSaveButton();
    await expect(app.profilePage.profileCountry).toHaveText(country);
  });

   test('Add birthdate', async ({ app }) => {
    const pastDate = faker.date.past().toISOString();
    const year = pastDate.slice(0, 4);
    const month = pastDate.slice(5, 7);
    const day = pastDate.slice(8, 10);
    const fullDate = `${day}.${month}.${year}`

    await app.editProfileForm.enterBirthdate(fullDate);
    await app.editProfileForm.clickSaveButton();
    await expect(app.profilePage.profileBirthday).toHaveText(fullDate);
  });

   test('Validation - empty name', async ({ app }) => {
    await app.editProfileForm.enterName('');
    await expect(app.editProfileForm.emptyNameErrorMessage).toBeVisible();
  });

   test('Validation - empty last name', async ({ app }) => {
    await app.editProfileForm.enterLastName('');
    await expect(app.editProfileForm.emptyLastNameErrorMessage).toBeVisible();
  });
  
   test('Validation - empty country (with space)', async ({ app }) => {
    await app.editProfileForm.enterCountry(' ');
    await expect(app.editProfileForm.invalidCountryErrorMessage).toBeVisible();
    await expect(app.editProfileForm.invalidLengthCountryErrorMessage).toBeVisible();
  });

}) 