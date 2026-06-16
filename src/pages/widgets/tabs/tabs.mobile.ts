import { Page } from '@playwright/test';
import { TabsPage } from './tabs.page';

export class TabsMobilePage extends TabsPage {
  constructor(page: Page) {
    super(page);
  }
}
