import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PageFactory } from '../pages/page.factory';
import { users } from '../test-data/user';

async function loginIfNeeded(world: any) {
const currentUrl = world.page.url();
  if (/\/profile/.test(currentUrl)) return;

  const loginPage = PageFactory.login(world.page);

  await loginPage.open();
  await loginPage.login(users.valid.username, users.valid.password);
   try {
    await expect(world.page).toHaveURL(/\/profile/, { timeout: 15000 });
  } catch (e) {
    // Nếu login fail thì vẫn ở /login hoặc /profile
    const msg = await world.page.locator('#name').first().textContent().catch(() => '');
    throw new Error(
      `Login failed. Still at: ${world.page.url()}. Message: ${msg || '(no message)'}`
    );
  }
}

When('user searches book with keyword {string}', async function (keyword: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(keyword);
});

Then('search results should contain {string}', async function (text: string) {
  const books = PageFactory.books(this.page);
  const ok = await books.resultsContain(text);
  expect(ok).toBeTruthy();
});

When('user adds book {string} to collection', async function (title: string) {
  await loginIfNeeded(this);

  const books = PageFactory.books(this.page);
  await books.open();
  await books.search(title);
  await books.openBookByTitle(title);

  await PageFactory.bookDetail(this.page).addToCollection();
});

Then('the book {string} should appear in profile collection', async function (title: string) {
  const profile = PageFactory.profile(this.page);
  await profile.open();
  expect(await profile.hasBook(title)).toBeTruthy();
});

When('user removes book {string} from profile collection', async function (title: string) {
  await loginIfNeeded(this);

  const profile = PageFactory.profile(this.page);
  await profile.open();
  await profile.removeBook(title);
});

Then('the book {string} should not appear in profile collection', async function (title: string) {
  const profile = PageFactory.profile(this.page);
  await profile.open();
  expect(await profile.hasBook(title)).toBeFalsy();
});
