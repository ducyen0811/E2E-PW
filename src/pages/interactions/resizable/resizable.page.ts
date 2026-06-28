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
    await this.restrictedHandle.scrollIntoViewIfNeeded();
    await expect(this.restrictedHandle).toBeVisible();

    const box = await this.getRestrictedBoxSize();
    await this.restrictedBox.evaluate((element, size) => {
      (element as HTMLElement).dataset.initialWidth = String(size.width);
      (element as HTMLElement).dataset.initialHeight = String(size.height);
    }, box);

    await this.dragRestrictedHandle();

    // Ads can cause a late layout shift on DemoQA and move the handle between
    // hover and mouse-down. Retry only when the first drag did not resize it.
    const resized = await this.getRestrictedBoxSize();
    if (resized.width <= box.width && resized.height <= box.height) {
      await this.dragRestrictedHandle();
    }
  }

  async expectRestrictedBoxIncreased(): Promise<void> {
    const initialSize = await this.restrictedBox.evaluate((element) => ({
      width: Number((element as HTMLElement).dataset.initialWidth),
      height: Number((element as HTMLElement).dataset.initialHeight)
    }));
    const resized = await this.restrictedBox.boundingBox();
    expect(resized).not.toBeNull();

    // The component has max-width: 100%, so Linux font/layout differences can
    // constrain one axis by a few pixels. The box is successfully enlarged
    // when its rendered area grows and at least one dimension increases.
    const widthIncreased = resized!.width > initialSize.width;
    const heightIncreased = resized!.height > initialSize.height;
    expect(widthIncreased || heightIncreased).toBeTruthy();
    expect(resized!.width * resized!.height)
      .toBeGreaterThan(initialSize.width * initialSize.height);
  }

  private async dragRestrictedHandle(): Promise<void> {
    // locator.hover() waits for the handle to be visible, stable and actionable,
    // and places the pointer using its current position rather than stale bounds.
    await this.restrictedHandle.hover();
    const handle = await this.restrictedHandle.boundingBox();
    expect(handle).not.toBeNull();

    await this.page.mouse.down();
    await this.page.mouse.move(
      handle!.x + handle!.width / 2 + 120,
      handle!.y + handle!.height / 2 + 80,
      { steps: 10 }
    );
    await this.page.mouse.up();
  }

  private async getRestrictedBoxSize(): Promise<BoxSize> {
    const box = await this.restrictedBox.boundingBox();
    expect(box).not.toBeNull();
    return { width: box!.width, height: box!.height };
  }
}
