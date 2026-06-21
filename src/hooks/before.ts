import { Before, setDefaultTimeout } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { createPage } from '../config/driver.factory';
import { ENV } from '../config/env';

// increase cucumber's default hook timeout to match our navigation timeout + buffer
setDefaultTimeout(ENV.navigationTimeout);

Before({ tags: 'not @api' }, async function () {
  const { browser, page } = await createPage();
  this.browser = browser;
  this.page = page;
  this.scenario = this.pickle;
  try {
  await this.page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });
  } catch (error) {
    console.error(`Failed to navigate to ${process.env.BASE_URL}:`, error);
    throw error;
  }
});

Before({ tags: '@api' }, async function () {
  this.api = await request.newContext({
    baseURL: ENV.baseUrl,
    extraHTTPHeaders: { Accept: 'application/json' }
  });
});
