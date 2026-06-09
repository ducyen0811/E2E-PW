import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

Given('the user is on the Browser Windows page', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.open();
  await browserWindows.expectLoaded();
});

When('the user opens a new tab from the Browser Windows page', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.openNewTabAndExpectSamplePage();
});

When('the user opens a new window from the Browser Windows page', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.openNewWindowAndExpectSamplePage();
});

When('the user opens a new message window from the Browser Windows page', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.openNewMessageWindowAndExpectMessage();
});

Then('the Browser Windows page remains visible', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.expectLoaded();
});
