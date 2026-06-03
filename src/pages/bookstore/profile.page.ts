import { expect, Page } from '@playwright/test';

export class ProfilePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/profile');
  }

  async hasBook(title: string): Promise<boolean> {
    const book = this.page.getByRole('link', { name: title }).first();

    try {
      await expect(book).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async removeBook(title: string) {
    const book = this.page.getByRole('link', { name: title });
    await expect(book).toBeVisible();
    await this.page.locator('span[title="Delete"]').first().click();

    const dialogPromise = this.page.waitForEvent('dialog', { timeout: 5000 })
      .then((dialog) => dialog.accept())
      .catch(() => undefined);

    await this.page.locator('#closeSmallModal-ok').click();
    await dialogPromise;
    await expect(book).toBeHidden({ timeout: 10000 });
  }
}
