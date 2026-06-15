import { Page } from '@playwright/test';
import { BooksPage } from './books.page';

export class BooksDesktopPage extends BooksPage {
  constructor(page: Page) {
    super(page);
  }
}
