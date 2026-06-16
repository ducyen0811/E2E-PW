import { expect, Locator, Page } from '@playwright/test';

export type TextBoxData = {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
};

export class TextBoxPage {
  private readonly title: Locator;
  private readonly fullNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly currentAddressInput: Locator;
  private readonly permanentAddressInput: Locator;
  private readonly submitButton: Locator;
  private readonly output: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.output = page.locator('#output');
  }

  async open(): Promise<void> {
    await this.page.goto('/text-box', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Text Box');
    await expect(this.fullNameInput).toBeVisible();
  }

  async submit(data: TextBoxData): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.currentAddressInput.fill(data.currentAddress);
    await this.permanentAddressInput.fill(data.permanentAddress);
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async expectSubmittedData(data: TextBoxData): Promise<void> {
    await expect(this.output).toBeVisible();
    await expect(this.output).toContainText(`Name:${data.fullName}`);
    await expect(this.output).toContainText(`Email:${data.email}`);
    await expect(this.output).toContainText(`Current Address :${data.currentAddress}`);
    await expect(this.output).toContainText(`Permananet Address :${data.permanentAddress}`);
  }

  async expectEmailValidationError(): Promise<void> {
    await expect(this.output).toBeHidden();
    await expect(this.emailInput).toHaveClass(/field-error/);
  }
}
