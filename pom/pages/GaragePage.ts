import { expect, Locator } from '@playwright/test'
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    public readonly logOutButton: Locator = this.page.locator('//a[@class="btn btn-link text-danger btn-sidebar sidebar_btn"]');
    public readonly pageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly myProfileButton: Locator = this.page.locator('//button[@id="userNavDropdown"]');
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });
    private readonly editCarIcons: Locator = this.page.locator('.icon-edit');
    private readonly successAddingMessage = this.page.locator('.alert-success p', { hasText: 'Car added' });
    private readonly successRemovingMessage = this.page.locator('.alert-success p', { hasText: 'Car removed' });
    private readonly lastAddedCarName = this.page.locator('.car_name.h2').first();
    private readonly lastAddedCarMileageField = this.page.locator('[name="miles"]').first();

    async navigate() {
        await super.navigate('/panel/garage');
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }

    async openAddCarForm() {
        await this.addCarButton.click();
    }

    async openEditCarForm(carIndex: number) {
        await this.editCarIcons.nth(carIndex).click();
    }
    async verifyCarIsAdded(carName: string, carMileage: string) {
        await expect(this.successAddingMessage).toBeVisible();
        await expect(this.lastAddedCarName).toHaveText(carName);
        await expect(this.lastAddedCarMileageField).toHaveValue(carMileage);
    }
    
        async verifyCarIsRemoved() {
        await expect(this.successRemovingMessage).toBeVisible();
    }   
}