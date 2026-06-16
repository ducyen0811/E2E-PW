import { expect, Page } from '@playwright/test';
import { PracticeFormData, PracticeFormPage } from './practice-form.page';

const genderLabelByValue: Record<PracticeFormData['gender'], string> = {
  Male: 'gender-radio-1',
  Female: 'gender-radio-2',
  Other: 'gender-radio-3'
};

export class PracticeFormMobilePage extends PracticeFormPage {
  constructor(private page: Page) {
    super();
  }

  async open(): Promise<void> {
    await this.page.goto('/automation-practice-form');
  }

  async submit(data: PracticeFormData): Promise<void> {
    await this.page.locator('#firstName').fill(data.firstName);
    await this.page.locator('#lastName').fill(data.lastName);
    await this.page.locator('#userEmail').fill(data.email);
    await this.page.locator(`label[for="${genderLabelByValue[data.gender]}"]`).click();
    await this.page.locator('#userNumber').fill(data.mobile);

    await this.page.locator('#submit').scrollIntoViewIfNeeded();
    await this.page.locator('#submit').click({ force: true });
  }

  async submitEmptyForm(): Promise<void> {
    await this.submitForm();
  }

  async submitWithShortMobileNumber(): Promise<void> {
    await this.page.locator('#firstName').fill('Short');
    await this.page.locator('#lastName').fill('Mobile');
    await this.page.locator(`label[for="${genderLabelByValue.Male}"]`).click();
    await this.page.locator('#userNumber').fill('12345');
    await this.submitForm();
  }

  async expectSubmittedData(data: PracticeFormData): Promise<void> {
    await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');

    const modal = this.page.locator('.modal-content');
    await expect(modal).toContainText(`${data.firstName} ${data.lastName}`);
    await expect(modal).toContainText(data.email);
    await expect(modal).toContainText(data.gender);
    await expect(modal).toContainText(data.mobile);
  }

  async expectRequiredFieldValidation(): Promise<void> {
    await expect(this.page.locator('.modal-content')).toBeHidden();
    const invalidFields = await this.page.locator('#firstName, #lastName, #userNumber').evaluateAll(
      (inputs) => inputs.filter((input) => !(input as HTMLInputElement).checkValidity()).length
    );
    expect(invalidFields).toBeGreaterThan(0);
  }

  private async submitForm(): Promise<void> {
    await this.page.locator('#submit').scrollIntoViewIfNeeded();
    await this.page.locator('#submit').click({ force: true });
  }
}
