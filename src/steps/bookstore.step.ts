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

async function loginIfNeeded(world: any) {
  const currentUrl = world.page.url();
  if (/\/profile/.test(currentUrl)) return;

  const account = await ensureFreshAccount(world);
  const loginPage = PageFactory.login(world.page);

  await loginPage.open();
  await loginPage.login(account.username, account.password);
  try {
    await expect(world.page).toHaveURL(/\/profile/, { timeout: 15000 });
  } catch (e) {
    const msg = await world.page.locator('#name').first().textContent().catch(() => '');
    throw new Error(
      `Login failed. Still at: ${world.page.url()}. Message: ${msg || '(no message)'}`
    );
  }
}

When('người dùng tìm sách với từ khóa {string}', async function (keyword: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(keyword);
});

Then('kết quả tìm kiếm phải chứa {string}', async function (text: string) {
  const books = PageFactory.books(this.page);
  const ok = await books.resultsContain(text);
  expect(ok).toBeTruthy();
});

When('người dùng thêm sách {string} vào bộ sưu tập', async function (title: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(title);
  await books.openBookByTitle(title);

  await PageFactory.bookDetail(this.page).addToCollection();
});

Then('sách {string} phải xuất hiện trong bộ sưu tập hồ sơ', async function (title: string) {
  const profile = PageFactory.profile(this.page);
  await profile.open();
  expect(await profile.hasBook(title)).toBeTruthy();
});

When('người dùng xóa sách {string} khỏi bộ sưu tập hồ sơ', async function (title: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(title);
  await books.openBookByTitle(title);
  await PageFactory.bookDetail(this.page).addToCollection();

  const profile = PageFactory.profile(this.page);
  await profile.open();
  await profile.removeBook(title);
});

Then('sách {string} không còn xuất hiện trong bộ sưu tập hồ sơ', async function (title: string) {
  const profile = PageFactory.profile(this.page);
  await profile.open();
  expect(await profile.hasBook(title)).toBeFalsy();
});
