import { expect, Locator, Page } from '@playwright/test';

export class TabsPage {
  private readonly title: Locator;
  private readonly whatTab: Locator;
  private readonly originTab: Locator;
  private readonly useTab: Locator;
  private readonly whatContent: Locator;
  private readonly originContent: Locator;
  private readonly useContent: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.whatTab = page.locator('#demo-tab-what');
    this.originTab = page.locator('#demo-tab-origin');
    this.useTab = page.locator('#demo-tab-use');
    this.whatContent = page.locator('#demo-tabpane-what');
    this.originContent = page.locator('#demo-tabpane-origin');
    this.useContent = page.locator('#demo-tabpane-use');
  }

  async open(): Promise<void> {
    await this.page.goto('/tabs', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Tabs');
    await expect(this.whatTab).toBeVisible();
  }

  async expectWhatTab(): Promise<void> {
    await expect(this.whatTab).toHaveClass(/active/);
    await expect(this.whatContent).toContainText('Lorem Ipsum');
  }

  async openOriginTab(): Promise<void> {
    await this.originTab.click();
  }

  async expectOriginTab(): Promise<void> {
    await expect(this.originTab).toHaveClass(/active/);
    await expect(this.originContent).toContainText('Contrary to popular belief');
  }

  async openUseTab(): Promise<void> {
    await this.useTab.click();
  }

  async expectUseTab(): Promise<void> {
    await expect(this.useTab).toHaveClass(/active/);
    await expect(this.useContent).toContainText('It is a long established fact');
  }
}
