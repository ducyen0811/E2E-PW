import { Page } from '@playwright/test';
import { BrokenLinksImagesPage } from './broken-links-images.page';

export class BrokenLinksImagesMobilePage extends BrokenLinksImagesPage {
  constructor(page: Page) {
    super(page);
  }
}
