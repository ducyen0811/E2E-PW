import { Page } from '@playwright/test';
import { ModalDialogsPage } from './modal-dialogs.page';

export class ModalDialogsMobilePage extends ModalDialogsPage {
  constructor(page: Page) {
    super(page);
  }
}
