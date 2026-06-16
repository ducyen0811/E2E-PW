import { Page } from '@playwright/test';
import { ProgressBarPage } from './progress-bar.page';

export class ProgressBarMobilePage extends ProgressBarPage {
  constructor(page: Page) {
    super(page);
  }
}
