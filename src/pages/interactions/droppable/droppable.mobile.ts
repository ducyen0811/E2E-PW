import { Page } from '@playwright/test';
import { DroppablePage } from './droppable.page';

export class DroppableMobilePage extends DroppablePage {
  constructor(page: Page) {
    super(page);
  }
}
