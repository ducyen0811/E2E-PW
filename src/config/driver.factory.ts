import { chromium, devices } from '@playwright/test';
import { ENV } from './env';

export async function createPage() {
  const browser = await chromium.launch({
    headless: ENV.headless
  });

  const context =
    ENV.device === 'mobile'
      ? await browser.newContext({ ...devices['iPhone 14'], baseURL: ENV.baseUrl })
      : await browser.newContext({
          viewport: { width: 1440, height: 900 },
          baseURL: ENV.baseUrl
        });

  // set baseURL so relative navigations like page.goto('/login') work
  // (Playwright's newContext accepts baseURL option)
  // If a device context is used, merge baseURL into that options object.

  const page = await context.newPage();
  // apply configurable timeouts
  // page.setDefaultTimeout applies to actions and locators
  if (ENV.wait) {
    page.setDefaultTimeout(ENV.wait);
  }
  // navigation timeout
  if (ENV.navigationTimeout) {
    page.setDefaultNavigationTimeout(ENV.navigationTimeout);
  }

  return { browser, page };
}