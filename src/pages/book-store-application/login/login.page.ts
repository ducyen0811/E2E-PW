import { expect, Locator, Page } from '@playwright/test';
import { ENV } from '../../../config/env';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(protected readonly page: Page) {
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.errorMessage = page.locator('#name, [role="alert"], .error, .alert').first();
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginSuccessfully(username: string, password: string): Promise<void> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= 2; attempt++) {
      await this.login(username, password);

      try {
        await expect(this.page).toHaveURL(/profile|dashboard/, { timeout: ENV.wait });
        return;
      } catch (error) {
        lastError = error;
        if (attempt < 2) {
          await this.page.waitForTimeout(1000);
          await this.open();
        }
      }
    }

    const message = await this.errorMessage.textContent().catch(() => '');
    throw new Error(
      `Valid login failed after 2 attempts. URL: ${this.page.url()}. ` +
      `Message: ${message?.trim() || '(no message)'}. ` +
      `Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`
    );
  }

  async expectLoginErrorVisible(): Promise<void> {
    try {
      await expect(this.errorMessage).toBeVisible({ timeout: 1000 });
    } catch {
      await expect(this.page.locator('input:invalid').first()).toBeVisible();
    }
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/profile|dashboard/, { timeout: ENV.wait });
  }
}
