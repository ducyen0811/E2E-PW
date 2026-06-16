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
    await PageFactory.profile(world.page).expectOpened();
  } catch (e) {
    const msg = await world.page.locator('#name').first().textContent().catch(() => '');
    throw new Error(
      `Login failed. Still at: ${world.page.url()}. Message: ${msg || '(no message)'}`
    );
  }
}

When('the user searches books with keyword {string}', async function (keyword: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(keyword);
});

Then('the search results should contain {string}', async function (text: string) {
  const books = PageFactory.books(this.page);
  await books.expectResultsContain(text);
});

Then('no bookstore search results should be displayed', async function () {
  const books = PageFactory.books(this.page);
  await books.expectNoSearchResults();
});

When('the user adds book {string} to the collection', async function (title: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(title);
  await books.openBookByTitle(title);

  await PageFactory.bookDetail(this.page).addToCollection();
});

Then('book {string} should appear in the profile collection', async function (title: string) {
  const profile = PageFactory.profile(this.page);
  await profile.open();
  expect(await profile.hasBook(title)).toBeTruthy();
});

When('the user removes book {string} from the profile collection', async function (title: string) {
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

Then('book {string} should no longer appear in the profile collection', async function (title: string) {
  const profile = PageFactory.profile(this.page);
  await profile.open();
  expect(await profile.hasBook(title)).toBeFalsy();
});
