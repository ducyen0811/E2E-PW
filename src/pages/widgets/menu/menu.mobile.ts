import { Page } from '@playwright/test';
import { MenuPage } from './menu.page';

export class MenuMobilePage extends MenuPage {
  constructor(page: Page) {
    super(page);
  }
}
