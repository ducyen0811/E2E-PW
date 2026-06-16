import { expect, Page } from '@playwright/test';
import { BrowserWindowsPage } from './browser-windows.page';

export class BrowserWindowsMobilePage extends BrowserWindowsPage {
  constructor(private page: Page) {
    super();
  }

  async open(): Promise<void> {
    await this.page.goto('/browser-windows', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.locator('h1')).toHaveText('Browser Windows');
    await expect(this.page.locator('#tabButton')).toBeVisible();
    await expect(this.page.locator('#windowButton')).toBeVisible();
    await expect(this.page.locator('#messageWindowButton')).toBeVisible();
  }

  async openNewTabAndExpectSamplePage(): Promise<void> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.locator('#tabButton').click();
    const popup = await popupPromise;

    await this.expectSamplePage(popup);
    await popup.close();
  }

  async openNewWindowAndExpectSamplePage(): Promise<void> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.locator('#windowButton').click();
    const popup = await popupPromise;

    await this.expectSamplePage(popup);
    await popup.close();
  }

  async openNewMessageWindowAndExpectMessage(): Promise<void> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.locator('#messageWindowButton').click();
    const popup = await popupPromise;

    await popup.waitForLoadState('domcontentloaded');
    await expect(popup.locator('body')).toContainText('Knowledge increases by sharing');
    await popup.close();
  }

  async openTwoNewTabsAndExpectSamplePages(): Promise<void> {
    await this.openNewTabAndExpectSamplePage();
    await this.openNewTabAndExpectSamplePage();
    expect(this.page.context().pages().filter((page) => !page.isClosed())).toHaveLength(1);
  }

  private async expectSamplePage(popup: Page): Promise<void> {
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup.locator('#sampleHeading')).toHaveText('This is a sample page');
  }
}
