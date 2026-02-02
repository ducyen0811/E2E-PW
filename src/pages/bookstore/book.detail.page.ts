import { Page } from '@playwright/test';

export class BookDetailPage {
  constructor(private page: Page) {}

  async addToCollection() {
    await this.page.getByRole('button', { name: /Add To Your Collection/i }).click();

    // DemoQA thường bật alert
    try {
      const dialog = await this.page.waitForEvent('dialog', { timeout: 3000 });
      await dialog.accept();
    } catch {}
  }
}
