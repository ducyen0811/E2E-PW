import { Page } from '@playwright/test';
import { AutoCompletePage } from './auto-complete.page';

export class AutoCompleteDesktopPage extends AutoCompletePage {
  constructor(page: Page) {
    super(page);
  }
}
