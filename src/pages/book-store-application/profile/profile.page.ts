import { expect, Page } from '@playwright/test';
import { ENV } from '../../../config/env';

export class ProfilePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/profile');
  }

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async expectOpened(): Promise<void> {
    await expect(this.page).toHaveURL(/profile|dashboard/, { timeout: ENV.wait });
  }

  async expectRedirectedToLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
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

  async removeBook(title: string): Promise<void> {
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
