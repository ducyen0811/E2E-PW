import { Page } from '@playwright/test';
import { DragabblePage } from './dragabble.page';

export class DragabbleDesktopPage extends DragabblePage {
  constructor(page: Page) {
    super(page);
  }
}
