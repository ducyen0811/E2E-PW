import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class FramesPage {
  private readonly title: Locator;
  private readonly firstFrame: Locator;
  private readonly secondFrame: Locator;
  private readonly firstFrameContent: FrameLocator;
  private readonly secondFrameContent: FrameLocator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.firstFrame = page.locator('#frame1');
    this.secondFrame = page.locator('#frame2');
    this.firstFrameContent = page.frameLocator('#frame1');
    this.secondFrameContent = page.frameLocator('#frame2');
  }

  async open(): Promise<void> {
    await this.page.goto('/frames', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Frames');
    await expect(this.firstFrame).toBeVisible();
    await expect(this.secondFrame).toBeVisible();
  }

  async expectBothFramesDisplaySampleHeading(): Promise<void> {
    await expect(this.sampleHeadingIn(this.firstFrameContent)).toHaveText('This is a sample page');
    await expect(this.sampleHeadingIn(this.secondFrameContent)).toHaveText('This is a sample page');
  }

  async expectFirstFrameLargerThanSecondFrame(): Promise<void> {
    const firstFrameBox = await this.firstFrame.boundingBox();
    const secondFrameBox = await this.secondFrame.boundingBox();

    expect(firstFrameBox).not.toBeNull();
    expect(secondFrameBox).not.toBeNull();
    expect(firstFrameBox!.width).toBeGreaterThan(secondFrameBox!.width);
    expect(firstFrameBox!.height).toBeGreaterThan(secondFrameBox!.height);
  }

  private sampleHeadingIn(frame: FrameLocator): Locator {
    return frame.locator('#sampleHeading');
  }
}
