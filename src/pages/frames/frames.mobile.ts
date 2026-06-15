import { Page } from '@playwright/test';
import { FramesPage } from './frames.page';

export class FramesMobilePage extends FramesPage {
  constructor(page: Page) {
    super(page);
  }
}
