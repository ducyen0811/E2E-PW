import { Page } from '@playwright/test';
import { ENV } from '../config/env';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async open(path: string) {
    await this.page.goto(`${ENV.baseUrl}${path}`);
  }
}