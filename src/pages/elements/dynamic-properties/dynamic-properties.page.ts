import { expect, Locator, Page } from '@playwright/test';

export class DynamicPropertiesPage {
  private readonly title: Locator;
  private readonly enableAfterButton: Locator;
  private readonly colorChangeButton: Locator;
  private readonly visibleAfterButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.enableAfterButton = page.locator('#enableAfter');
    this.colorChangeButton = page.locator('#colorChange');
    this.visibleAfterButton = page.locator('#visibleAfter');
  }

  async open(): Promise<void> {
    await this.page.goto('/dynamic-properties', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Dynamic Properties');
    await expect(this.enableAfterButton).toBeDisabled();
    await expect(this.colorChangeButton).toBeVisible();
  }

  async expectDynamicStates(): Promise<void> {
    await expect(this.enableAfterButton).toBeEnabled({ timeout: 7000 });
    await expect(this.colorChangeButton).toHaveClass(/text-danger/, { timeout: 7000 });
    await expect(this.visibleAfterButton).toBeVisible({ timeout: 7000 });
  }

  async expectInitialStates(): Promise<void> {
    await expect(this.enableAfterButton).toBeDisabled();
    await expect(this.colorChangeButton).not.toHaveClass(/text-danger/);
    await expect(this.visibleAfterButton).toBeHidden();
  }
}
