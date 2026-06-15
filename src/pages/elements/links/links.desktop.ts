import { Page } from '@playwright/test';
import { LinksPage } from './links.page';

export class LinksDesktopPage extends LinksPage {
  constructor(page: Page) {
    super(page);
  }
}
