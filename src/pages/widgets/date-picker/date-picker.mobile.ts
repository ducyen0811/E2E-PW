import { Page } from '@playwright/test';
import { DatePickerPage } from './date-picker.page';

export class DatePickerMobilePage extends DatePickerPage {
  constructor(page: Page) {
    super(page);
  }
}
