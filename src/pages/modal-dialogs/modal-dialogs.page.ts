import { expect, Locator, Page } from '@playwright/test';

export class ModalDialogsPage {
  private readonly title: Locator;
  private readonly smallModalButton: Locator;
  private readonly largeModalButton: Locator;
  private readonly modalContent: Locator;
  private readonly smallModalTitle: Locator;
  private readonly largeModalTitle: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.smallModalButton = page.locator('#showSmallModal');
    this.largeModalButton = page.locator('#showLargeModal');
    this.modalContent = page.locator('.modal-content');
    this.smallModalTitle = page.locator('#example-modal-sizes-title-sm');
    this.largeModalTitle = page.locator('#example-modal-sizes-title-lg');
  }

  async open(): Promise<void> {
    await this.page.goto('/modal-dialogs', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Modal Dialogs');
    await expect(this.smallModalButton).toBeVisible();
    await expect(this.largeModalButton).toBeVisible();
    await expect(this.modalContent).toBeHidden();
  }

  async openSmallModal(): Promise<void> {
    await this.smallModalButton.click();
  }

  async openLargeModal(): Promise<void> {
    await this.largeModalButton.click();
  }

  async expectSmallModalDisplayed(): Promise<void> {
    await expect(this.modalContent).toBeVisible();
    await expect(this.smallModalTitle).toHaveText('Small Modal');
    await expect(this.modalContent).toContainText('This is a small modal. It has very less content');
  }

  async expectLargeModalDisplayed(): Promise<void> {
    await expect(this.modalContent).toBeVisible();
    await expect(this.largeModalTitle).toHaveText('Large Modal');
    await expect(this.modalContent).toContainText('Lorem Ipsum is simply dummy text');
  }

  async closeModal(): Promise<void> {
    await this.modalContent.getByText('Close').click();
    await expect(this.modalContent).toBeHidden();
  }
}
