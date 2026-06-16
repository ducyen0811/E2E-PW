import { Page } from '@playwright/test';
import { TabsPage } from './tabs.page';

export class TabsDesktopPage extends TabsPage {
  constructor(page: Page) {
    super(page);
  }
}
