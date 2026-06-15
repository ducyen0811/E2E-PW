import { expect, Locator, Page } from '@playwright/test';

export type WebTableRecord = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
};

export class WebTablesPage {
  private readonly title: Locator;
  private readonly addButton: Locator;
  private readonly modal: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.addButton = page.locator('#addNewRecordButton');
    this.modal = page.locator('.modal-content');
    this.submitButton = page.locator('#submit');
  }

  async open(): Promise<void> {
    await this.page.goto('/webtables', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Web Tables');
    await expect(this.addButton).toBeVisible();
  }

  async addRecord(record: WebTableRecord): Promise<void> {
    await this.addButton.click();
    await this.fillRegistrationForm(record);
    await this.submitButton.click();
    await expect(this.rowByEmail(record.email)).toBeVisible();
  }

  async editRecord(email: string, record: WebTableRecord): Promise<void> {
    const row = this.rowByEmail(email);
    await row.locator('[title="Edit"]').click();
    await this.fillRegistrationForm(record);
    await this.submitButton.click();
    await expect(this.rowByEmail(record.email)).toContainText(record.department);
  }

  async deleteRecord(email: string): Promise<void> {
    const row = this.rowByEmail(email);
    await row.locator('[title="Delete"]').click();
  }

  async expectRecordRemoved(email: string): Promise<void> {
    await expect(this.rowByEmail(email)).toHaveCount(0);
  }

  private async fillRegistrationForm(record: WebTableRecord): Promise<void> {
    await expect(this.modal).toBeVisible();
    await this.page.locator('#firstName').fill(record.firstName);
    await this.page.locator('#lastName').fill(record.lastName);
    await this.page.locator('#userEmail').fill(record.email);
    await this.page.locator('#age').fill(record.age);
    await this.page.locator('#salary').fill(record.salary);
    await this.page.locator('#department').fill(record.department);
  }

  private rowByEmail(email: string): Locator {
    return this.page.locator('tbody tr', { hasText: email });
  }
}
