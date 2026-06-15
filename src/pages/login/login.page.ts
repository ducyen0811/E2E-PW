import { expect, Locator, Page } from '@playwright/test';

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
    await expect(this.page).toHaveURL(/profile|dashboard/);
  }
}
