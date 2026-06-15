import { Page } from '@playwright/test';
import { UploadDownloadPage } from './upload-download.page';

export class UploadDownloadMobilePage extends UploadDownloadPage {
  constructor(page: Page) {
    super(page);
  }
}
