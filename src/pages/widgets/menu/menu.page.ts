import { expect, Locator, Page } from '@playwright/test';
import { ENV } from '../../../config/env';

export class MenuPage {
  private readonly title: Locator;
  private readonly mainItemTwo: Locator;
  private readonly subSubList: Locator;
  private readonly subSubItemOne: Locator;
  private readonly subSubItemTwo: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    // DemoQA's menu visibility is driven by this exact nested <li> hierarchy.
    // Structural selectors avoid matching hidden descendant/duplicate items.
    this.mainItemTwo = page.locator('#nav > li:nth-child(2) > a');
    this.subSubList = page.locator('#nav > li:nth-child(2) > ul > li:nth-child(3) > a');
    this.subSubItemOne = page.locator(
      '#nav > li:nth-child(2) > ul > li:nth-child(3) > ul > li:nth-child(1) > a'
    );
    this.subSubItemTwo = page.locator(
      '#nav > li:nth-child(2) > ul > li:nth-child(3) > ul > li:nth-child(2) > a'
    );
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
    await expect(this.subSubList).toBeVisible({ timeout: ENV.wait });
    await this.subSubList.hover();
    await expect(this.subSubItemOne).toBeVisible({ timeout: ENV.wait });
  }

  async expectNestedItemsVisible(): Promise<void> {
    await expect(this.subSubItemOne).toBeVisible({ timeout: ENV.wait });
    await expect(this.subSubItemTwo).toBeVisible({ timeout: ENV.wait });
  }
}
