import { expect, Locator, Page } from '@playwright/test';

export class RadioButtonPage {
  private readonly title: Locator;
  private readonly yesLabel: Locator;
  private readonly impressiveLabel: Locator;
  private readonly noInput: Locator;
  private readonly result: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.yesLabel = page.locator('label[for="yesRadio"]');
    this.impressiveLabel = page.locator('label[for="impressiveRadio"]');
    this.noInput = page.locator('#noRadio');
    this.result = page.locator('.text-success');
  }

  async open(): Promise<void> {
    await this.page.goto('/radio-button', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Radio Button');
    await expect(this.yesLabel).toBeVisible();
    await expect(this.noInput).toBeDisabled();
  }

  async selectAvailableOptions(): Promise<void> {
    await this.yesLabel.click();
    await expect(this.result).toHaveText('Yes');

    await this.impressiveLabel.click();
    await expect(this.result).toHaveText('Impressive');
  }

  async expectAvailableOptionsSelected(): Promise<void> {
    await expect(this.result).toHaveText('Impressive');
    await expect(this.noInput).toBeDisabled();
  }
}
