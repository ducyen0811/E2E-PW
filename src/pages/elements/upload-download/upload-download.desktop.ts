import { Page } from '@playwright/test';
import { UploadDownloadPage } from './upload-download.page';

export class UploadDownloadDesktopPage extends UploadDownloadPage {
  constructor(page: Page) {
    super(page);
  }
}
