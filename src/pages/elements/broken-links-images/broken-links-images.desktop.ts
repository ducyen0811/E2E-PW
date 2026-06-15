import { Page } from '@playwright/test';
import { BrokenLinksImagesPage } from './broken-links-images.page';

export class BrokenLinksImagesDesktopPage extends BrokenLinksImagesPage {
  constructor(page: Page) {
    super(page);
  }
}
