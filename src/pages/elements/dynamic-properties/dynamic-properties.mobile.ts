import { Page } from '@playwright/test';
import { DynamicPropertiesPage } from './dynamic-properties.page';

export class DynamicPropertiesMobilePage extends DynamicPropertiesPage {
  constructor(page: Page) {
    super(page);
  }
}
