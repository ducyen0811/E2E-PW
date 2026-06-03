import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PageFactory } from '../pages/page.factory';
import { createDemoQaAccount } from '../utils/demoqa-account';

async function ensureFreshAccount(world: any) {
  if (!world.account) {
    world.account = await createDemoQaAccount();
  }

  return world.account;
}

async function loginWithValidCredentials(world: any): Promise<void> {
  const account = await ensureFreshAccount(world);
  const loginPage = PageFactory.login(world.page);
  await loginPage.open();
  await loginPage.login(account.username, account.password);
}

When('người dùng đăng nhập', async function () {
  await loginWithValidCredentials(this);
});

When('người dùng đăng nhập bằng thông tin hợp lệ', async function () {
  await loginWithValidCredentials(this);
});

When('người dùng đăng nhập bằng mật khẩu không hợp lệ', async function () {
  const account = await ensureFreshAccount(this);
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(account.username, `${account.password}_invalid`);
});

When('người dùng đăng xuất', async function () {
  await loginWithValidCredentials(this);
  await expect(this.page).toHaveURL(/profile|dashboard/);

  await this.page.click('#submit');
});

When('người dùng đăng ký bằng thông tin hợp lệ', async function () {
  await ensureFreshAccount(this);
});

When('người dùng đăng ký bằng email không hợp lệ', async function () {
  const registerPage = PageFactory.register(this.page);
  await registerPage.open();

  await registerPage.register('Test', 'User', 'invalid_email', 'P@ssw0rd123');
});

Then('người dùng đăng nhập thành công', async function () {
  await expect(this.page).toHaveURL(/profile|dashboard/);
});

Then('bảng điều khiển được hiển thị', async function () {
  await expect(this.page).toHaveURL(/profile|dashboard/);
});

Then('thông báo lỗi đăng nhập được hiển thị', async function () {
  await expect(
    this.page.locator('#name, [role="alert"], .error, .alert').first()
  ).toBeVisible();
});

Then('người dùng vẫn ở trang đăng nhập', async function () {
  await expect(this.page).toHaveURL(/login/);
});

Then('người dùng được chuyển về trang đăng nhập', async function () {
  await expect(this.page).toHaveURL(/login/);
});

Then('đăng ký thành công', async function () {
  expect(this.account?.userId).toBeTruthy();
});

Then('thông báo lỗi đăng ký được hiển thị', async function () {
  await expect(
    this.page.locator('#name, [role="alert"], .error, .alert').first()
  ).toBeVisible();
});
