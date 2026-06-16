import { expect, Locator, Page } from '@playwright/test';

export class SelectablePage {
  private readonly title: Locator;
  private readonly listTab: Locator;
  private readonly listItems: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.listTab = page.locator('#demo-tab-list');
    this.listItems = page.locator('#verticalListContainer .list-group-item');
  }

  async open(): Promise<void> {
    await this.page.goto('/selectable', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Selectable');
    await expect(this.listTab).toHaveClass(/active/);
    await expect(this.listItems).toHaveCount(4);
  }

  async selectMultipleItems(): Promise<void> {
    await this.listItems.nth(0).click();
    await this.listItems.nth(2).click();
  }

  async expectSelectedItems(): Promise<void> {
    await expect(this.listItems.nth(0)).toHaveClass(/active/);
    await expect(this.listItems.nth(2)).toHaveClass(/active/);
    await expect(this.listItems.nth(1)).not.toHaveClass(/active/);
  }
}
