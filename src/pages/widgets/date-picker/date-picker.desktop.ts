import { Page } from '@playwright/test';
import { DatePickerPage } from './date-picker.page';

export class DatePickerDesktopPage extends DatePickerPage {
  constructor(page: Page) {
    super(page);
  }
}
