import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

Given('người dùng đang ở trang Browser Windows', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.open();
  await browserWindows.expectLoaded();
});

When('người dùng mở tab mới từ trang Browser Windows', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.openNewTabAndExpectSamplePage();
});

When('người dùng mở cửa sổ mới từ trang Browser Windows', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.openNewWindowAndExpectSamplePage();
});

When('người dùng mở cửa sổ thông báo mới từ trang Browser Windows', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.openNewMessageWindowAndExpectMessage();
});

Then('trang Browser Windows vẫn hiển thị bình thường', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.expectLoaded();
});
