import { expect, Locator, Page } from '@playwright/test';

export class AccordianPage {
  private readonly title: Locator;
  private readonly firstHeading: Locator;
  private readonly secondHeading: Locator;
  private readonly thirdHeading: Locator;
  private readonly firstContentText: Locator;
  private readonly secondContentText: Locator;
  private readonly thirdContentText: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.firstHeading = page.getByText('What is Lorem Ipsum?', { exact: true });
    this.secondHeading = page.getByText('Where does it come from?', { exact: true });
    this.thirdHeading = page.getByText('Why do we use it?', { exact: true });
    this.firstContentText = page.getByText('Lorem Ipsum is simply dummy text', { exact: false });
    this.secondContentText = page.getByText('Contrary to popular belief', { exact: false });
    this.thirdContentText = page.getByText('It is a long established fact', { exact: false });
  }

  async open(): Promise<void> {
    await this.page.goto('/accordian', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Accordian');
    await expect(this.firstHeading).toBeVisible();
  }

  async expectFirstSectionExpanded(): Promise<void> {
    await expect(this.firstContentText).toBeVisible();
  }

  async openSecondSection(): Promise<void> {
    await this.secondHeading.click();
  }

  async expectSecondSectionExpanded(): Promise<void> {
    await expect(this.secondContentText).toBeVisible();
  }

  async openThirdSection(): Promise<void> {
    await this.thirdHeading.click();
  }

  async expectThirdSectionExpanded(): Promise<void> {
    await expect(this.thirdContentText).toBeVisible();
  }
}
