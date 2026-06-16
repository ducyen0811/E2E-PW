import { Page } from '@playwright/test';
import { DroppablePage } from './droppable.page';

export class DroppableDesktopPage extends DroppablePage {
  constructor(page: Page) {
    super(page);
  }
}
