import { expect, Locator, Page } from '@playwright/test';

export class BooksPage {
  private readonly searchBox: Locator;

  constructor(protected readonly page: Page) {
    this.searchBox = page.locator('#searchBox');
  }

  async open(): Promise<void> {
    await this.page.goto('/books');
  }

  async search(keyword: string): Promise<void> {
    await this.searchBox.fill(keyword);
  }

  async openBookByTitle(title: string): Promise<void> {
    await this.bookLink(title).click();
  }

  async resultsContain(text: string): Promise<boolean> {
    await this.expectResultsContain(text);
    return true;
  }

  async expectResultsContain(text: string): Promise<void> {
    await expect(this.bookLink(new RegExp(text, 'i')).first()).toBeVisible();
  }

  async expectNoSearchResults(): Promise<void> {
    await expect(this.page.locator('.rt-tbody a').first()).toBeHidden();
  }

  private bookLink(name: string | RegExp): Locator {
    return this.page.getByRole('link', { name });
  }
}
