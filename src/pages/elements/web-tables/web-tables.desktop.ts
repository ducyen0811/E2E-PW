import { Page } from '@playwright/test';
import { WebTablesPage } from './web-tables.page';

export class WebTablesDesktopPage extends WebTablesPage {
  constructor(page: Page) {
    super(page);
  }
}
