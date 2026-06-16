import { Page } from '@playwright/test';
import { AccordianPage } from './accordian.page';

export class AccordianMobilePage extends AccordianPage {
  constructor(page: Page) {
    super(page);
  }
}
