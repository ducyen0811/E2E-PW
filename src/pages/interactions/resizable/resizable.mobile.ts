import { Page } from '@playwright/test';
import { ResizablePage } from './resizable.page';

export class ResizableMobilePage extends ResizablePage {
  constructor(page: Page) {
    super(page);
  }
}
