import { Locator, Page } from '@playwright/test';

export class BookDetailPage {
  private readonly addToCollectionButton: Locator;

  constructor(private readonly page: Page) {
    this.addToCollectionButton = page.getByRole('button', { name: /Add To Your Collection/i });
  }

  async addToCollection(): Promise<void> {
    await this.addToCollectionButton.click();

    try {
      const dialog = await this.page.waitForEvent('dialog', { timeout: 3000 });
      await dialog.accept();
    } catch {}
  }
}
