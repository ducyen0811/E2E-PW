import { Page } from '@playwright/test';
import { FramesPage } from './frames.page';

export class FramesDesktopPage extends FramesPage {
  constructor(page: Page) {
    super(page);
  }
}
