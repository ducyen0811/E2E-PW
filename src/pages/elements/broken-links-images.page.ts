import { expect, Locator, Page } from '@playwright/test';

export class BrokenLinksImagesPage {
  private readonly title: Locator;
  private readonly validImage: Locator;
  private readonly brokenImage: Locator;
  private readonly validLink: Locator;
  private readonly brokenLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.validImage = page.locator('img').first();
    this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
    this.validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
    this.brokenLink = page.getByRole('link', { name: 'Click Here for Broken Link' });
  }

  async open(): Promise<void> {
    await this.page.goto('/broken', { waitUntil: 'networkidle' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Broken Links - Images');
    await expect(this.validImage).toBeVisible();
    await expect(this.brokenImage).toBeVisible();
  }

  async expectImagesStatus(): Promise<void> {
    await expect(this.validImage).toHaveJSProperty('naturalWidth', 347);
    await expect(this.brokenImage).toHaveJSProperty('naturalWidth', 0);
  }

  async expectValidLinkNavigatesHome(): Promise<void> {
    await this.validLink.click();
    await expect(this.page).toHaveURL(/demoqa\.com\/?$/);
    await this.open();
  }

  async expectBrokenLinkNavigatesToErrorPage(): Promise<void> {
    await this.brokenLink.click();
    await expect(this.page).toHaveURL(/status_codes\/500/);
    await expect(this.page.locator('body')).toContainText('This page returned a 500 status code');
  }
}
