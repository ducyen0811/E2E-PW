import { Page } from '@playwright/test';
import { ModalDialogsPage } from './modal-dialogs.page';

export class ModalDialogsDesktopPage extends ModalDialogsPage {
  constructor(page: Page) {
    super(page);
  }
}
