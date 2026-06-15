import { Page } from '@playwright/test';
import { DynamicPropertiesPage } from './dynamic-properties.page';

export class DynamicPropertiesDesktopPage extends DynamicPropertiesPage {
  constructor(page: Page) {
    super(page);
  }
}
