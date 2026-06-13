import { expect, Page } from '@playwright/test';
import { FramesPage } from './frames.page';

export class FramesMobilePage extends FramesPage {
  constructor(private page: Page) {
    super();
  }

  async open(): Promise<void> {
    await this.page.goto('/frames', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('h1')).toHaveText('Frames');
    await expect(this.page.locator('#frame1')).toBeVisible();
    await expect(this.page.locator('#frame2')).toBeVisible();
  }

  async expectBothFramesDisplaySampleHeading(): Promise<void> {
    await expect(this.page.frameLocator('#frame1').locator('#sampleHeading')).toHaveText('This is a sample page');
    await expect(this.page.frameLocator('#frame2').locator('#sampleHeading')).toHaveText('This is a sample page');
  }

  async expectFirstFrameLargerThanSecondFrame(): Promise<void> {
    const firstFrameBox = await this.page.locator('#frame1').boundingBox();
    const secondFrameBox = await this.page.locator('#frame2').boundingBox();

    expect(firstFrameBox).not.toBeNull();
    expect(secondFrameBox).not.toBeNull();
    expect(firstFrameBox!.width).toBeGreaterThan(secondFrameBox!.width);
    expect(firstFrameBox!.height).toBeGreaterThan(secondFrameBox!.height);
  }
}
