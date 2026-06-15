import { Page } from '@playwright/test';
import { ButtonsPage } from './buttons.page';

export class ButtonsMobilePage extends ButtonsPage {
  constructor(page: Page) {
    super(page);
  }
}
