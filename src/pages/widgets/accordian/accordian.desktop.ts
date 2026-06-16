import { Page } from '@playwright/test';
import { AccordianPage } from './accordian.page';

export class AccordianDesktopPage extends AccordianPage {
  constructor(page: Page) {
    super(page);
  }
}
