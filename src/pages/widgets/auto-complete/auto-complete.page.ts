import { expect, Locator, Page } from '@playwright/test';

export class AutoCompletePage {
  private readonly title: Locator;
  private readonly multipleInput: Locator;
  private readonly singleInput: Locator;
  private readonly multiValues: Locator;
  private readonly singleValue: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.multipleInput = page.locator('#autoCompleteMultipleInput');
    this.singleInput = page.locator('#autoCompleteSingleInput');
    this.multiValues = page.locator('.auto-complete__multi-value__label');
    this.singleValue = page.locator('.auto-complete__single-value');
  }

  async open(): Promise<void> {
    await this.page.goto('/auto-complete', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Auto Complete');
    await expect(this.multipleInput).toBeVisible();
    await expect(this.singleInput).toBeVisible();
  }

  async selectMultipleColors(): Promise<void> {
    await this.selectReactOption(this.multipleInput, 'Red');
    await this.selectReactOption(this.multipleInput, 'Green');
  }

  async selectSingleColor(): Promise<void> {
    await this.selectReactOption(this.singleInput, 'Blue');
  }

  async expectSelectedColors(): Promise<void> {
    await expect(this.multiValues).toContainText(['Red', 'Green']);
    await expect(this.singleValue).toHaveText('Blue');
  }

  private async selectReactOption(input: Locator, value: string): Promise<void> {
    await input.fill(value);
    await this.page.getByText(value, { exact: true }).last().click();
  }
}
