import { expect, Locator, Page } from '@playwright/test';

export class ButtonsPage {
  private readonly title: Locator;
  private readonly doubleClickButton: Locator;
  private readonly rightClickButton: Locator;
  private readonly dynamicClickButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('h1');
    this.doubleClickButton = page.locator('#doubleClickBtn');
    this.rightClickButton = page.locator('#rightClickBtn');
    this.dynamicClickButton = page.getByRole('button', { name: 'Click Me', exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('/buttons', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Buttons');
    await expect(this.doubleClickButton).toBeVisible();
  }

  async performAllClickActions(): Promise<void> {
    await this.doubleClickButton.dblclick();
    await this.rightClickButton.click({ button: 'right' });
    await this.dynamicClickButton.click();
  }

  async singleClickDoubleClickButton(): Promise<void> {
    await this.doubleClickButton.click();
  }

  async expectAllClickMessages(): Promise<void> {
    await expect(this.page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
    await expect(this.page.locator('#rightClickMessage')).toHaveText('You have done a right click');
    await expect(this.page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
  }

  async expectDoubleClickMessageHidden(): Promise<void> {
    await expect(this.page.locator('#doubleClickMessage')).toBeHidden();
  }
}
