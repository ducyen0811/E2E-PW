import { expect, Locator, Page } from '@playwright/test';

const targetDate = '12/31/2026';
const targetDateTime = 'December 31, 2026 11:45 PM';

export class DatePickerPage {
  private readonly title: Locator;
  private readonly dateInput: Locator;
  private readonly dateTimeInput: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.dateInput = page.locator('#datePickerMonthYearInput');
    this.dateTimeInput = page.locator('#dateAndTimePickerInput');
  }

  async open(): Promise<void> {
    await this.page.goto('/date-picker', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Date Picker');
    await expect(this.dateInput).toBeVisible();
    await expect(this.dateTimeInput).toBeVisible();
  }

  async setDate(): Promise<void> {
    await this.dateInput.fill(targetDate);
    await this.dateInput.press('Enter');
  }

  async setDateAndTime(): Promise<void> {
    await this.dateTimeInput.fill(targetDateTime);
    await this.dateTimeInput.press('Enter');
  }

  async expectUpdatedValues(): Promise<void> {
    await expect(this.dateInput).toHaveValue(targetDate);
    await expect(this.dateTimeInput).toHaveValue(targetDateTime);
  }
}
