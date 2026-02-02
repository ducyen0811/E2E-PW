import { Before, setDefaultTimeout } from '@cucumber/cucumber';
import { createPage } from '../config/driver.factory';
import { ENV } from '../config/env';

// increase cucumber's default hook timeout to match our navigation timeout + buffer
setDefaultTimeout(ENV.navigationTimeout);

Before(async function () {
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
