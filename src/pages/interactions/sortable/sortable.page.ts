import { expect, Locator, Page } from '@playwright/test';

export class SortablePage {
  private readonly title: Locator;
  private readonly listTab: Locator;
  private readonly gridTab: Locator;
  private readonly listItems: Locator;
  private readonly gridItems: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.listTab = page.locator('#demo-tab-list');
    this.gridTab = page.locator('#demo-tab-grid');
    this.listItems = page.locator('#demo-tabpane-list .list-group-item');
    this.gridItems = page.locator('#demo-tabpane-grid .list-group-item');
  }

  async open(): Promise<void> {
    await this.page.goto('/sortable', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Sortable');
    await expect(this.listTab).toHaveClass(/active/);
    await expect(this.listItems).toHaveCount(6);
  }

  async switchToGrid(): Promise<void> {
    await this.gridTab.click();
    await expect(this.gridTab).toHaveClass(/active/);
  }

  async expectSortableItemsReady(): Promise<void> {
    await expect(this.listItems).toHaveCount(6);
    await expect(this.gridItems).toHaveCount(9);
    await expect(this.listItems.first()).toHaveAttribute('draggable', 'true');
    await expect(this.gridItems.first()).toHaveAttribute('draggable', 'true');
    await expect(this.gridItems).toContainText(['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']);
  }
}
