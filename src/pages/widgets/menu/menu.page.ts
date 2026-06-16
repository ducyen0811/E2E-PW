import { expect, Locator, Page } from '@playwright/test';

export class MenuPage {
  private readonly title: Locator;
  private readonly mainItemTwo: Locator;
  private readonly subSubList: Locator;
  private readonly subSubItemOne: Locator;
  private readonly subSubItemTwo: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.mainItemTwo = page.getByText('Main Item 2', { exact: true });
    this.subSubList = page.getByText('SUB SUB LIST »', { exact: true });
    this.subSubItemOne = page.getByText('Sub Sub Item 1', { exact: true });
    this.subSubItemTwo = page.getByText('Sub Sub Item 2', { exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('/menu', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Menu');
    await expect(this.mainItemTwo).toBeVisible();
  }

  async hoverNestedMenu(): Promise<void> {
    await this.mainItemTwo.hover();
    await expect(this.subSubList).toBeVisible();
    await this.subSubList.hover();
  }

  async expectNestedItemsVisible(): Promise<void> {
    await expect(this.subSubItemOne).toBeVisible();
    await expect(this.subSubItemTwo).toBeVisible();
  }
}
