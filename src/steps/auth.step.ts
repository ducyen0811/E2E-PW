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

When('the user logs in', async function () {
  await loginWithValidCredentials(this);
});

When('the user logs in with valid credentials', async function () {
  await loginWithValidCredentials(this);
});

When('the user logs in with an invalid password', async function () {
  const account = await ensureFreshAccount(this);
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(account.username, `${account.password}_invalid`);
});

When('the user logs in with an empty username', async function () {
  const account = await ensureFreshAccount(this);
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login('', account.password);
});

When('the user logs in with an empty password', async function () {
  const account = await ensureFreshAccount(this);
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(account.username, '');
});

When('the user logs out', async function () {
  await loginWithValidCredentials(this);
  await expect(this.page).toHaveURL(/profile|dashboard/);

  await this.page.click('#submit');
});

When('the user registers with valid information', async function () {
  await ensureFreshAccount(this);
});

When('the user registers with an invalid email', async function () {
  const registerPage = PageFactory.register(this.page);
  await registerPage.open();

  await registerPage.register('Test', 'User', 'invalid_email', 'P@ssw0rd123');
});

Then('the user is logged in successfully', async function () {
  await expect(this.page).toHaveURL(/profile|dashboard/);
});

Then('the dashboard is displayed', async function () {
  await expect(this.page).toHaveURL(/profile|dashboard/);
});

Then('the login error message is displayed', async function () {
  await expect(
    this.page.locator('#name, [role="alert"], .error, .alert').first()
  ).toBeVisible();
});

Then('the user remains on the login page', async function () {
  await expect(this.page).toHaveURL(/login/);
});

Then('the user is redirected to the login page', async function () {
  await expect(this.page).toHaveURL(/login/);
});

Then('registration is successful', async function () {
  expect(this.account?.userId).toBeTruthy();
});

Then('the registration error message is displayed', async function () {
  await expect(
    this.page.locator('#name, [role="alert"], .error, .alert').first()
  ).toBeVisible();
});
