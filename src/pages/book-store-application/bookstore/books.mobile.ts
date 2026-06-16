import { Page } from '@playwright/test';
import { BooksPage } from './books.page';

export class BooksMobilePage extends BooksPage {
  constructor(page: Page) {
    super(page);
  }
}
