import { expect, Locator, Page } from '@playwright/test';

export class SliderPage {
  private readonly title: Locator;
  private readonly slider: Locator;
  private readonly sliderValue: Locator;

  constructor(protected readonly page: Page) {
    this.title = page.locator('h1');
    this.slider = page.locator('#sliderContainer input[type="range"]');
    this.sliderValue = page.locator('#sliderValue');
  }

  async open(): Promise<void> {
    await this.page.goto('/slider', { waitUntil: 'domcontentloaded' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Slider');
    await expect(this.slider).toBeVisible();
  }

  async moveTo(value: number): Promise<void> {
    await this.slider.evaluate((input, nextValue) => {
      const slider = input as HTMLInputElement;
      const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
      valueSetter?.call(slider, String(nextValue));
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }

  async expectValue(value: number): Promise<void> {
    await expect(this.sliderValue).toHaveValue(String(value));
  }
}
