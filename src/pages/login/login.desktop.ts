import { LoginPage } from './login.page';
import { Page } from '@playwright/test';

export class LoginDesktopPage extends LoginPage {
  constructor(page: Page) {
    super(page);
  }
}
