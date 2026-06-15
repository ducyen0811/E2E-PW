import { Page } from '@playwright/test';
import { NestedFramesPage } from './nested-frames.page';

export class NestedFramesDesktopPage extends NestedFramesPage {
  constructor(page: Page) {
    super(page);
  }
}
