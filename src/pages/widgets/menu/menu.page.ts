import { expect, Locator, Page } from '@playwright/test';

export class MenuPage {
  private readonly title: Locator;
  private readonly mainItemTwo: Locator;
  private readonly subSubList: Locator;
  private readonly subSubItemOne: Locator;
  private readonly subSubItemTwo: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    // Hover the owning <li> elements because their CSS :hover state controls
    // submenu visibility. Hovering only the link text is flaky headlessly.
    this.mainItemTwo = page.locator('#nav > li')
      .filter({ has: page.getByRole('link', { name: 'Main Item 2', exact: true }) })
      .first();
    this.subSubList = this.mainItemTwo.locator(':scope > ul > li')
      .filter({ hasText: /^SUB SUB LIST/ })
      .first();
    this.subSubItemOne = this.subSubList.getByRole('link', { name: 'Sub Sub Item 1', exact: true });
    this.subSubItemTwo = this.subSubList.getByRole('link', { name: 'Sub Sub Item 2', exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('/menu', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Menu');
    await expect(this.mainItemTwo).toBeVisible();
  }

  async hoverNestedMenu(): Promise<void> {
    await this.mainItemTwo.scrollIntoViewIfNeeded();
    await this.mainItemTwo.hover();
    await expect(this.subSubList).toBeVisible();
    await this.subSubList.hover();
    await expect(this.subSubItemOne).toBeVisible();
  }

  async expectNestedItemsVisible(): Promise<void> {
    await expect(this.subSubItemOne).toBeVisible();
    await expect(this.subSubItemTwo).toBeVisible();
  }
}
