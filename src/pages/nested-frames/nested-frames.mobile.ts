import { Page } from '@playwright/test';
import { NestedFramesPage } from './nested-frames.page';

export class NestedFramesMobilePage extends NestedFramesPage {
  constructor(page: Page) {
    super(page);
  }
}
