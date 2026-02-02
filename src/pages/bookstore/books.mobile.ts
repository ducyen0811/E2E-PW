import { Page } from '@playwright/test';
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
    const body = await this.page.locator('.rt-tbody').innerText().catch(() => '');
    return body.toLowerCase().includes(text.toLowerCase());
  }
}
