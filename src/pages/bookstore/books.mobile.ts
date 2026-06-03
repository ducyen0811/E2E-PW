import { expect, Page } from '@playwright/test';
import { BooksPage } from './books.page';

export class BooksMobilePage extends BooksPage {
  constructor(private page: Page) { super(); }

  async open() {
    await this.page.goto('/books');
  }

  async search(keyword: string) {
    await this.page.locator('#searchBox').fill(keyword);
  }

  async openBookByTitle(title: string) {
    await this.page.getByRole('link', { name: title }).click();
  }

  async resultsContain(text: string): Promise<boolean> {
    await expect(this.page.getByRole('link', { name: new RegExp(text, 'i') }).first()).toBeVisible();
    return true;
  }
}
