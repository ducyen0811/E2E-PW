import { Page } from '@playwright/test';

export class ProfilePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/profile');
  }

  async hasBook(title: string): Promise<boolean> {
    const body = await this.page.locator('.rt-tbody').innerText().catch(() => '');
    return body.includes(title);
  }

  async removeBook(title: string) {
    const row = this.page.locator('.rt-tr-group', { hasText: title }).first();
    await row.locator('span[title="Delete"], button:has-text("Delete"), svg').first().click().catch(async () => {
      await this.page.getByRole('button', { name: /Delete/i }).first().click();
    });

    try {
      await this.page.getByRole('button', { name: /OK/i }).click({ timeout: 2000 });
    } catch {}

    // alert 
    try {
      const dialog = await this.page.waitForEvent('dialog', { timeout: 3000 });
      await dialog.accept();
    } catch {}
  }
}
