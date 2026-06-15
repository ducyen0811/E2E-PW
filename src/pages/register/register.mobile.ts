import { RegisterPage } from './register.page';
import type { Page } from '@playwright/test';

export class RegisterMobilePage extends RegisterPage {
  constructor(page: Page) {
    super(page);
  }
}
