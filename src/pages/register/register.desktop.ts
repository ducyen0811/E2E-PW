import { RegisterPage } from './register.page';
import type { Page } from '@playwright/test';

export class RegisterDesktopPage extends RegisterPage {
  constructor(private page: Page) {
    super();
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
    await this.page.fill('#firstname', firstName);
    await this.page.fill('#lastname', lastName);
    await this.page.fill('#userName', userName);
    await this.page.fill('#password', password);

    await this.page.click('#register');
  }
}
