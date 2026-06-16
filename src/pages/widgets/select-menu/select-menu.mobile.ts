import { Page } from '@playwright/test';
import { SelectMenuPage } from './select-menu.page';

export class SelectMenuMobilePage extends SelectMenuPage {
  constructor(page: Page) {
    super(page);
  }
}
