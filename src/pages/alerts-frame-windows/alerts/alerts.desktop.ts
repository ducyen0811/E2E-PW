import { Page } from '@playwright/test';
import { AlertsPage } from './alerts.page';

export class AlertsDesktopPage extends AlertsPage {
  constructor(page: Page) {
    super(page);
  }
}
