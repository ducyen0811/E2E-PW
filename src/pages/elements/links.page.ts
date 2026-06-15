import { expect, Locator, Page } from '@playwright/test';

const responseLinks = [
  { id: 'created', code: '201', text: 'Created' },
  { id: 'no-content', code: '204', text: 'No Content' },
  { id: 'moved', code: '301', text: 'Moved Permanently' },
  { id: 'bad-request', code: '400', text: 'Bad Request' },
  { id: 'unauthorized', code: '401', text: 'Unauthorized' },
  { id: 'forbidden', code: '403', text: 'Forbidden' },
  { id: 'invalid-url', code: '404', text: 'Not Found' }
];

export class LinksPage {
  private readonly title: Locator;
  private readonly homeLink: Locator;
  private readonly responseMessage: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.homeLink = page.locator('#simpleLink');
    this.responseMessage = page.locator('#linkResponse');
  }

  async open(): Promise<void> {
    await this.page.goto('/links', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Links');
    await expect(this.homeLink).toBeVisible();
  }

  async openHomeLinkAndExpectHomePage(): Promise<void> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.homeLink.click();
    const popup = await popupPromise;

    await popup.waitForLoadState('domcontentloaded');
    await expect(popup).toHaveURL(/demoqa\.com\/?$/);
    await popup.close();
  }

  async openApiResponseLinks(): Promise<void> {
    for (const link of responseLinks) {
      await this.page.locator(`#${link.id}`).click();
      await expect(this.responseMessage).toContainText(link.code);
      await expect(this.responseMessage).toContainText(link.text);
    }
  }

  async expectApiResponseMessages(): Promise<void> {
    await expect(this.responseMessage).toContainText('404');
    await expect(this.responseMessage).toContainText('Not Found');
  }
}
