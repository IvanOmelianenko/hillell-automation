import { Locator, Page, expect } from '@playwright/test';
import { BaseForm } from './BaseForm';
import { generatePassword, PasswordType } from '../../utils/data/password';
import { generateName, generateRandomEmail } from '../../utils/data/credentials';

export class SignUpFormMy extends BaseForm {
    public readonly firstNameField: Locator = this.page.locator('#signupName');
    public readonly lastNameField: Locator = this.page.locator('#signupLastName');
    public readonly emailField: Locator = this.page.locator('#signupEmail');
    public readonly passwordField: Locator = this.page.getByRole('textbox', { name: 'Password', exact: true });
    public readonly repeatPasswordField: Locator = this.page.getByRole('textbox', { name: 'Re-enter password' });
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    public readonly emptyFirstNameMessage: Locator = this.page.getByText('Name required', { exact: true });
    public readonly invalidFirstNameMessage: Locator = this.page.getByText('Name is invalid');
    public readonly invalidFirstNameCharsMessage: Locator = this.page.getByText('Name has to be from 2 to 20');
    public readonly emptyLastNameMessage: Locator = this.page.getByText('Last name required');
    public readonly invalidLastNameMessage: Locator = this.page.getByText('Last name is invalid');
    public readonly invalidLastNameCharsMessage: Locator = this.page.getByText('Last name has to be from 2 to 20');
    public readonly wrongEmailFormatMessage: Locator = this.page.getByText('Email is incorrect');
    public readonly emptyEmailMessage: Locator = this.page.getByText('Email required');
    public readonly invalidPasswordMessage: Locator = this.page.getByText('Password has to be from 8 to');
    public readonly emptyPasswordMessage: Locator = this.page.getByText('Password required');
    public readonly passwordNotMatchMessage = this.page.getByText('Passwords do not match');
    public readonly repeatEmptyPasswordMessage = this.page.getByText('Re-enter password required');


async signUpWithCredentials(
        firstName: string = generateName(),
        lastName: string = generateName(),
        email: string = generateRandomEmail(),
        password: string = generatePassword(),
        repeatPassword?: string
    ) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        
        await this.enterPassword(password);
        await this.enterRepeatPassword(repeatPassword ?? password);
        
        await this.clickRegisterButton();
    }

    async enterFirstName(firstName?: string) {
        const nameToEnter = firstName ?? generateName();
        await this.firstNameField.fill(nameToEnter);
    }

    async enterLastName(lastName?: string) {
        const nameToEnter = lastName ?? generateName();
        await this.lastNameField.fill(nameToEnter);
    }

    async enterEmail(email?: string) {
        const emailToEnter = email ?? generateRandomEmail();
        await this.emailField.fill(emailToEnter);
    }

    async enterRepeatPassword(repeatPassword?: string) {
        if (repeatPassword) {
            await this.repeatPasswordField.fill(repeatPassword);
        } else {
            await this.repeatPasswordField.fill('');
        }
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    private async triggerValidation(field: Locator) {
        await field.focus();
        await field.blur();
    }

    async triggerFirstNameValidation() {
        await this.triggerValidation(this.firstNameField);
    }

    async triggerLastNameValidation() {
        await this.triggerValidation(this.lastNameField);
    }

    async triggerEmailValidation() {
        await this.triggerValidation(this.emailField);
    }

    async triggerPasswordValidation() {
        await this.triggerValidation(this.passwordField);
    }

    async triggerRepeatPasswordValidation() {
        await this.triggerValidation(this.repeatPasswordField);
    }

    async checkBorderColor(field: Locator) {
        await expect(field).toHaveCSS('border', '1px solid rgb(220, 53, 69)');
    }

    
async enterPassword(password?: PasswordType | string) {
    const predefinedTypes: PasswordType[] = ['short', 'long', 'noUpper', 'noLower', 'noDigit', 'noSpecial'];
    
    let passToEnter: string;

    if (!password) {
        passToEnter = generatePassword(); 
    } else if (predefinedTypes.includes(password as PasswordType)) {
        passToEnter = generatePassword(password as PasswordType);
    } else {
        passToEnter = password;
    }

    await this.passwordField.fill(passToEnter);
}

async fillFields(firstName?: string, lastName?: string, email?: string, password?: string, repeatPassword?: string) {
    await this.enterFirstName(firstName);    
    await this.enterLastName(lastName ?? generateName());
    await this.enterEmail(email ?? generateRandomEmail());
    await this.enterPassword(password);
    await this.enterRepeatPassword(repeatPassword ?? password);

}
}