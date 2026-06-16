import { Page } from '@playwright/test';
import { SliderPage } from './slider.page';

export class SliderDesktopPage extends SliderPage {
  constructor(page: Page) {
    super(page);
  }
}
