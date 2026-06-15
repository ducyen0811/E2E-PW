import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly registerButton: Locator;
  private readonly errorMessage: Locator;

  constructor(protected readonly page: Page) {
    this.firstNameInput = page.locator('#firstname');
    this.lastNameInput = page.locator('#lastname');
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('#register');
    this.errorMessage = page.locator('#name, [role="alert"], .error, .alert').first();
  }

  async open(): Promise<void> {
    await this.page.goto('/register');
  }

  async register(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.usernameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }

  async expectRegistrationErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
