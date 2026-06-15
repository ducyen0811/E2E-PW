import { Page } from '@playwright/test';
import { TextBoxPage } from './text-box.page';

export class TextBoxMobilePage extends TextBoxPage {
  constructor(page: Page) {
    super(page);
  }
}
