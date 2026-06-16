import { Page } from '@playwright/test';
import { SortablePage } from './sortable.page';

export class SortableDesktopPage extends SortablePage {
  constructor(page: Page) {
    super(page);
  }
}
