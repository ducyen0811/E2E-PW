import { Page } from '@playwright/test';
import { ButtonsPage } from './buttons.page';

export class ButtonsDesktopPage extends ButtonsPage {
  constructor(page: Page) {
    super(page);
  }
}
