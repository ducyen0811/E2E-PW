import { expect, Locator, Page } from '@playwright/test';

export class CheckBoxPage {
  private readonly title: Locator;
  private readonly homeCheckbox: Locator;
  private readonly result: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.homeCheckbox = page.locator('[role="checkbox"][aria-label="Select Home"]');
    this.result = page.locator('#result');
  }

  async open(): Promise<void> {
    await this.page.goto('/checkbox', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Check Box');
    await expect(this.homeCheckbox).toBeVisible();
  }

  async selectHome(): Promise<void> {
    await this.homeCheckbox.click();
  }

  async expectHomeSelected(): Promise<void> {
    await expect(this.result).toBeVisible();
    await expect(this.result).toContainText('home');
  }
}
