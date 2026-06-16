import { expect, Locator, Page } from '@playwright/test';

export class DragabblePage {
  private readonly title: Locator;
  private readonly dragBox: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.dragBox = page.locator('#dragBox');
  }

  async open(): Promise<void> {
    await this.page.goto('/dragabble', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Dragabble');
    await expect(this.dragBox).toBeVisible();
    await expect(this.dragBox).toHaveClass(/ui-draggable/);
  }

  async dragSimpleBox(): Promise<void> {
    const box = await this.dragBox.boundingBox();
    expect(box).not.toBeNull();
    await this.dragBox.evaluate((element, position) => {
      (element as HTMLElement).dataset.initialX = String(position.x);
      (element as HTMLElement).dataset.initialY = String(position.y);
    }, { x: box!.x, y: box!.y });

    await this.dragBox.dragTo(this.page.locator('body'), {
      sourcePosition: { x: 50, y: 20 },
      targetPosition: { x: 400, y: 350 },
      force: true
    });
  }

  async expectSimpleBoxMoved(): Promise<void> {
    const initialPosition = await this.dragBox.evaluate((element) => ({
      x: Number((element as HTMLElement).dataset.initialX),
      y: Number((element as HTMLElement).dataset.initialY)
    }));
    const moved = await this.dragBox.boundingBox();
    expect(moved).not.toBeNull();
    const movedDistance = Math.abs(moved!.x - initialPosition.x) + Math.abs(moved!.y - initialPosition.y);
    expect(movedDistance).toBeGreaterThan(0);
  }
}
