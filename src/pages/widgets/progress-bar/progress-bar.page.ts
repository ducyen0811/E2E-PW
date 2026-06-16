import { expect, Locator, Page } from '@playwright/test';

export class ProgressBarPage {
  private readonly title: Locator;
  private readonly startStopButton: Locator;
  private readonly resetButton: Locator;
  private readonly progressBar: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.startStopButton = page.locator('#startStopButton');
    this.resetButton = page.locator('#resetButton');
    this.progressBar = page.locator('.progress-bar');
  }

  async open(): Promise<void> {
    await this.page.goto('/progress-bar', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Progress Bar');
    await expect(this.startStopButton).toBeVisible();
    await expect(this.progressBar).toHaveAttribute('aria-valuenow', '0');
  }

  async start(): Promise<void> {
    await this.startStopButton.click();
  }

  async expectComplete(): Promise<void> {
    await expect(this.progressBar).toHaveAttribute('aria-valuenow', '100', { timeout: 15000 });
    await expect(this.progressBar).toHaveText('100%');
    await expect(this.resetButton).toBeVisible();
  }

  async reset(): Promise<void> {
    await this.resetButton.click();
  }

  async expectReset(): Promise<void> {
    await expect(this.progressBar).toHaveAttribute('aria-valuenow', '0');
    await expect(this.startStopButton).toBeVisible();
  }
}
