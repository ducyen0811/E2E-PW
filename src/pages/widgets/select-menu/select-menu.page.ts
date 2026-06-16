import { expect, Locator, Page } from '@playwright/test';

export class SelectMenuPage {
  private readonly title: Locator;
  private readonly selectValueInput: Locator;
  private readonly oldSelectMenu: Locator;
  private readonly carsSelect: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.selectValueInput = page.locator('#react-select-2-input');
    this.oldSelectMenu = page.locator('#oldSelectMenu');
    this.carsSelect = page.locator('#cars');
  }

  async open(): Promise<void> {
    await this.page.goto('/select-menu', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Select Menu');
    await expect(this.selectValueInput).toBeAttached();
    await expect(this.oldSelectMenu).toBeVisible();
    await expect(this.carsSelect).toBeVisible();
  }

  async selectValues(): Promise<void> {
    await this.selectReactOption(this.selectValueInput, 'Group 1, option 1');
    await this.oldSelectMenu.selectOption({ label: 'Aqua' });
    await this.carsSelect.selectOption([
      { label: 'Volvo' },
      { label: 'Saab' }
    ]);
  }

  async expectSelectedValues(): Promise<void> {
    await expect(this.page.getByText('Group 1, option 1', { exact: true })).toBeVisible();
    await expect(this.oldSelectMenu).toHaveValue('10');
    await expect(this.carsSelect).toHaveValues(['volvo', 'saab']);
  }

  private async selectReactOption(input: Locator, value: string): Promise<void> {
    await input.fill(value);
    await this.page.getByText(value, { exact: true }).last().click();
  }
}
