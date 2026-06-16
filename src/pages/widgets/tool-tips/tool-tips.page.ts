import { expect, Locator, Page } from '@playwright/test';

export class ToolTipsPage {
  private readonly title: Locator;
  private readonly button: Locator;
  private readonly input: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.button = page.locator('#toolTipButton');
    this.input = page.locator('#toolTipTextField');
  }

  async open(): Promise<void> {
    await this.page.goto('/tool-tips', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Tool Tips');
    await expect(this.button).toBeVisible();
    await expect(this.input).toBeVisible();
  }

  async hoverButton(): Promise<void> {
    await this.triggerTooltip(this.button);
  }

  async expectButtonTooltip(): Promise<void> {
    await expect(this.page.getByText('You hovered over the Button', { exact: true })).toBeVisible();
  }

  async hoverInput(): Promise<void> {
    await this.triggerTooltip(this.input);
  }

  async expectInputTooltip(): Promise<void> {
    await expect(this.page.getByText('You hovered over the text field', { exact: true })).toBeVisible();
  }

  private async triggerTooltip(target: Locator): Promise<void> {
    await target.scrollIntoViewIfNeeded();
    await target.dispatchEvent('mouseover');
  }
}
