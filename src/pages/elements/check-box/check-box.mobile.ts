import { Page } from '@playwright/test';
import { CheckBoxPage } from './check-box.page';

export class CheckBoxMobilePage extends CheckBoxPage {
  constructor(page: Page) {
    super(page);
  }
}
