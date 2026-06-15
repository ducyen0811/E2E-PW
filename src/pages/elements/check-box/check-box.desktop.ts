import { Page } from '@playwright/test';
import { CheckBoxPage } from './check-box.page';

export class CheckBoxDesktopPage extends CheckBoxPage {
  constructor(page: Page) {
    super(page);
  }
}
