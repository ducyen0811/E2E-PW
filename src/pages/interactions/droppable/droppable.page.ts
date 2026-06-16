import { expect, Locator, Page } from '@playwright/test';

export class DroppablePage {
  private readonly title: Locator;
  private readonly draggable: Locator;
  private readonly droppable: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.draggable = page.locator('#draggable');
    this.droppable = page.locator('#droppable').first();
  }

  async open(): Promise<void> {
    await this.page.goto('/droppable', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Droppable');
    await expect(this.draggable).toBeVisible();
    await expect(this.droppable).toContainText('Drop Here');
    await expect(this.draggable).toHaveClass(/ui-draggable/);
    await expect(this.droppable).toHaveClass(/ui-droppable/);
  }

  async dropSimpleItem(): Promise<void> {
    await this.draggable.dragTo(this.droppable, {
      sourcePosition: { x: 50, y: 20 },
      targetPosition: { x: 75, y: 75 },
      force: true
    });
  }

  async expectSimpleItemDropped(): Promise<void> {
    await expect(this.droppable).toContainText('Dropped!');
    await expect(this.droppable).toHaveClass(/ui-state-highlight/);
  }

  private async dragFromTo(source: Locator, target: Locator): Promise<void> {
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
    expect(sourceBox).not.toBeNull();
    expect(targetBox).not.toBeNull();

    await this.page.mouse.move(sourceBox!.x + sourceBox!.width / 2, sourceBox!.y + sourceBox!.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(targetBox!.x + targetBox!.width / 2, targetBox!.y + targetBox!.height / 2, { steps: 15 });
    await this.page.mouse.up();
  }
}
