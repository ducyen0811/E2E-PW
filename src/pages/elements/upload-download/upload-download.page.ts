import { expect, Locator, Page } from '@playwright/test';

const uploadedFileName = 'elements-upload.txt';
const complexUploadedFileName = 'manual qa edge-case !@# 100.txt';

export class UploadDownloadPage {
  private readonly title: Locator;
  private readonly downloadButton: Locator;
  private readonly uploadInput: Locator;
  private readonly uploadedFilePath: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.downloadButton = page.locator('#downloadButton');
    this.uploadInput = page.locator('#uploadFile');
    this.uploadedFilePath = page.locator('#uploadedFilePath');
  }

  async open(): Promise<void> {
    await this.page.goto('/upload-download', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Upload and Download');
    await expect(this.downloadButton).toBeVisible();
    await expect(this.uploadInput).toBeAttached();
  }

  async downloadSampleFile(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('sampleFile.jpeg');
  }

  async uploadFile(): Promise<void> {
    await this.uploadInput.setInputFiles({
      name: uploadedFileName,
      mimeType: 'text/plain',
      buffer: Buffer.from('DemoQA Elements upload test')
    });
  }

  async uploadComplexNamedFile(): Promise<void> {
    await this.uploadInput.setInputFiles({
      name: complexUploadedFileName,
      mimeType: 'text/plain',
      buffer: Buffer.from('Complex file name upload test')
    });
  }

  async expectUploadedFilePath(): Promise<void> {
    await expect(this.uploadedFilePath).toContainText(uploadedFileName);
  }

  async expectComplexUploadedFilePath(): Promise<void> {
    await expect(this.uploadedFilePath).toContainText(complexUploadedFileName);
  }
}
