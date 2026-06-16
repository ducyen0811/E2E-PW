import { Page } from '@playwright/test';
import { ToolTipsPage } from './tool-tips.page';

export class ToolTipsMobilePage extends ToolTipsPage {
  constructor(page: Page) {
    super(page);
  }
}
