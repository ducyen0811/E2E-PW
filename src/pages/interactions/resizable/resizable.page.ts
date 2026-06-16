import { expect, Locator, Page } from '@playwright/test';

type BoxSize = {
  width: number;
  height: number;
};

export class ResizablePage {
  private readonly title: Locator;
  private readonly restrictedBox: Locator;
  private readonly restrictedHandle: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.restrictedBox = page.locator('#resizableBoxWithRestriction');
    this.restrictedHandle = this.restrictedBox.locator('.react-resizable-handle');
  }

  async open(): Promise<void> {
    await this.page.goto('/resizable', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Resizable');
    await expect(this.restrictedBox).toBeVisible();
  }

  async resizeRestrictedBox(): Promise<void> {
    const box = await this.restrictedBox.boundingBox();
    const handle = await this.restrictedHandle.boundingBox();
    expect(box).not.toBeNull();
    expect(handle).not.toBeNull();
    await this.restrictedBox.evaluate((element, size) => {
      (element as HTMLElement).dataset.initialWidth = String(size.width);
      (element as HTMLElement).dataset.initialHeight = String(size.height);
    }, { width: box!.width, height: box!.height });

    await this.page.mouse.move(handle!.x + handle!.width / 2, handle!.y + handle!.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(handle!.x + 120, handle!.y + 80, { steps: 10 });
    await this.page.mouse.up();
  }

  async expectRestrictedBoxIncreased(): Promise<void> {
    const initialSize = await this.restrictedBox.evaluate((element) => ({
      width: Number((element as HTMLElement).dataset.initialWidth),
      height: Number((element as HTMLElement).dataset.initialHeight)
    }));
    const resized = await this.restrictedBox.boundingBox();
    expect(resized).not.toBeNull();
    expect(resized!.width).toBeGreaterThan(initialSize.width);
    expect(resized!.height).toBeGreaterThan(initialSize.height);
  }
}
