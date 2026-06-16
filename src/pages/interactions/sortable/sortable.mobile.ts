import { Page } from '@playwright/test';
import { SortablePage } from './sortable.page';

export class SortableMobilePage extends SortablePage {
  constructor(page: Page) {
    super(page);
  }
}
