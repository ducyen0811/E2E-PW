import { LoginPage } from './login.page';
import { Page } from '@playwright/test';

const usernameInput = '#userName';
const passwordInput = '#password';
const loginButton = '#login';

export class LoginMobilePage extends LoginPage {
  constructor(private page: Page) {
    super();
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.locator(usernameInput).fill(username);
    await this.page.locator(passwordInput).fill(password);
    await this.page.locator(loginButton).click();
  }
}
