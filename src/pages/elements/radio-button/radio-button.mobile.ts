import { Page } from '@playwright/test';
import { RadioButtonPage } from './radio-button.page';

export class RadioButtonMobilePage extends RadioButtonPage {
  constructor(page: Page) {
    super(page);
  }
}
