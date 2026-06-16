import { expect, Locator, Page } from '@playwright/test';

export class AlertsPage {
  private readonly title: Locator;
  private readonly basicAlertButton: Locator;
  private readonly delayedAlertButton: Locator;
  private readonly confirmAlertButton: Locator;
  private readonly promptAlertButton: Locator;
  private readonly confirmResult: Locator;
  private readonly promptResult: Locator;
  private handledMessages: string[] = [];

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.basicAlertButton = page.locator('#alertButton');
    this.delayedAlertButton = page.locator('#timerAlertButton');
    this.confirmAlertButton = page.locator('#confirmButton');
    this.promptAlertButton = page.locator('#promtButton');
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async open(): Promise<void> {
    await this.page.goto('/alerts', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Alerts');
    await expect(this.basicAlertButton).toBeVisible();
    await expect(this.delayedAlertButton).toBeVisible();
    await expect(this.confirmAlertButton).toBeVisible();
    await expect(this.promptAlertButton).toBeVisible();
  }

  async handleBasicAlert(): Promise<void> {
    const message = await this.acceptDialogFromClick(this.basicAlertButton);
    expect(message).toBe('You clicked a button');
    this.handledMessages.push(message);
  }

  async handleDelayedAlert(): Promise<void> {
    const message = await this.acceptDialogFromClick(this.delayedAlertButton);
    expect(message).toBe('This alert appeared after 5 seconds');
    this.handledMessages.push(message);
  }

  async acceptConfirmAlert(): Promise<void> {
    const message = await this.acceptDialogFromClick(this.confirmAlertButton);
    expect(message).toBe('Do you confirm action?');
    await expect(this.confirmResult).toHaveText('You selected Ok');
  }

  async dismissConfirmAlert(): Promise<void> {
    const message = await this.dismissDialogFromClick(this.confirmAlertButton);
    expect(message).toBe('Do you confirm action?');
    await expect(this.confirmResult).toHaveText('You selected Cancel');
  }

  async submitPromptAlert(promptText: string): Promise<void> {
    const message = await this.acceptDialogFromClick(this.promptAlertButton, promptText);
    expect(message).toBe('Please enter your name');
    await expect(this.promptResult).toHaveText(`You entered ${promptText}`);
  }

  async expectAlertResults(promptText: string): Promise<void> {
    await expect(this.confirmResult).toHaveText('You selected Ok');
    await expect(this.promptResult).toHaveText(`You entered ${promptText}`);
  }

  async expectConfirmDismissed(): Promise<void> {
    await expect(this.confirmResult).toHaveText('You selected Cancel');
  }

  async expectPromptResult(promptText: string): Promise<void> {
    await expect(this.promptResult).toHaveText(`You entered ${promptText}`);
  }

  private async acceptDialogFromClick(button: Locator, promptText?: string): Promise<string> {
    const messagePromise = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept(promptText);
        resolve(message);
      });
    });

    await button.click();
    return messagePromise;
  }

  private async dismissDialogFromClick(button: Locator): Promise<string> {
    const messagePromise = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.dismiss();
        resolve(message);
      });
    });

    await button.click();
    return messagePromise;
  }
}
