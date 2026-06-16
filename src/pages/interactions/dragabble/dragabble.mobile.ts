import { Page } from '@playwright/test';
import { DragabblePage } from './dragabble.page';

export class DragabbleMobilePage extends DragabblePage {
  constructor(page: Page) {
    super(page);
  }
}
