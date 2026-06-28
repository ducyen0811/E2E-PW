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
    // The owning <li> elements control submenu visibility through CSS :hover.
    this.mainItemTwo = page.locator('#nav > li:nth-child(2)');
    this.subSubList = this.mainItemTwo.locator(':scope > ul > li:nth-child(3)');
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
    await expect(this.mainItemTwo.locator(':scope > a')).toBeVisible();
  }

  async hoverNestedMenu(): Promise<void> {
    await this.mainItemTwo.scrollIntoViewIfNeeded();
    await this.expectNestedMenuRevealed();
  }

  async expectNestedItemsVisible(): Promise<void> {
    // Re-establish the CSS hover chain during the assertion. A late ad layout
    // shift or the boundary between Cucumber steps can move the menu away from
    // the pointer and collapse it even though the preceding hover succeeded.
    await this.expectNestedMenuRevealed();
  }

  private async expectNestedMenuRevealed(): Promise<void> {
    await expect.poll(async () => {
      try {
        await this.revealNestedMenu(1000);
        return await Promise.all([
          this.subSubItemOne.isVisible(),
          this.subSubItemTwo.isVisible()
        ]);
      } catch {
        return [false, false];
      }
    }, { timeout: ENV.wait }).toEqual([true, true]);
  }

  private async revealNestedMenu(timeout = ENV.wait): Promise<void> {
    await this.mainItemTwo.locator(':scope > a').hover({ timeout });
    await expect(this.subSubList).toBeVisible({ timeout });
    // It is already visible; skip the extra stability wait because DemoQA ads
    // can shift the submenu and collapse it while Playwright is waiting.
    await this.subSubList.locator(':scope > a').hover({ timeout, force: true });
  }
}
