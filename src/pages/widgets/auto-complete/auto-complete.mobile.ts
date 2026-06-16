import { Page } from '@playwright/test';
import { AutoCompletePage } from './auto-complete.page';

export class AutoCompleteMobilePage extends AutoCompletePage {
  constructor(page: Page) {
    super(page);
  }
}
