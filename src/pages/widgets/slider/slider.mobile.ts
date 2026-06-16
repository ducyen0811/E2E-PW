import { Page } from '@playwright/test';
import { SliderPage } from './slider.page';

export class SliderMobilePage extends SliderPage {
  constructor(page: Page) {
    super(page);
  }
}
