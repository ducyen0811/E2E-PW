import { Page } from '@playwright/test';
import { SelectablePage } from './selectable.page';

export class SelectableMobilePage extends SelectablePage {
  constructor(page: Page) {
    super(page);
  }
}
