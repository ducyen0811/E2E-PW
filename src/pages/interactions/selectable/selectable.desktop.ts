import { Page } from '@playwright/test';
import { SelectablePage } from './selectable.page';

export class SelectableDesktopPage extends SelectablePage {
  constructor(page: Page) {
    super(page);
  }
}
