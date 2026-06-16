import { RegisterPage } from './register.page';
import type { Page } from '@playwright/test';

export class RegisterDesktopPage extends RegisterPage {
  constructor(page: Page) {
    super(page);
  }
}
