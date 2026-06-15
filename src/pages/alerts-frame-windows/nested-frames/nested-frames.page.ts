import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class NestedFramesPage {
  private readonly title: Locator;
  private readonly parentFrame: FrameLocator;
  private readonly childFrame: FrameLocator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.parentFrame = page.frameLocator('#frame1');
    this.childFrame = this.parentFrame.frameLocator('iframe');
  }

  async open(): Promise<void> {
    await this.page.goto('/nestedframes', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Nested Frames');
  }

  async expectParentFrameText(): Promise<void> {
    await expect(this.parentFrame.locator('body')).toContainText('Parent frame');
  }

  async expectChildFrameText(): Promise<void> {
    await expect(this.childFrame.locator('body')).toContainText('Child Iframe');
  }

  async expectNestedFrameContent(): Promise<void> {
    await this.expectParentFrameText();
    await this.expectChildFrameText();
  }
}
