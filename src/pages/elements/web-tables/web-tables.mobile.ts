import { Page } from '@playwright/test';
import { WebTablesPage } from './web-tables.page';

export class WebTablesMobilePage extends WebTablesPage {
  constructor(page: Page) {
    super(page);
  }
}
