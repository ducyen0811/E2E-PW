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

async function loginWithCredentials(world: any, username: string, password: string): Promise<void> {
  const loginPage = PageFactory.login(world.page);
  await loginPage.open();
  await loginPage.login(username, password);
}

When('the user logs in', async function () {
  await loginWithValidCredentials(this);
});

When('the user logs in with valid credentials', async function () {
  await loginWithValidCredentials(this);
});

When('the user logs in with an invalid password', async function () {
  const account = await ensureFreshAccount(this);
  await loginWithCredentials(this, account.username, `${account.password}_invalid`);
});

When('the user logs in with a 100-character password', async function () {
  const account = await ensureFreshAccount(this);
  await loginWithCredentials(this, account.username, 'A'.repeat(100));
});

When('the user logs in with a username padded by spaces', async function () {
  const account = await ensureFreshAccount(this);
  await loginWithCredentials(this, `  ${account.username}  `, account.password);
});

When('the user logs in with injection-like credentials', async function () {
  await loginWithCredentials(this, "' OR '1'='1", "' OR '1'='1; DROP TABLE users; --");
});

When('the user logs in with an empty username', async function () {
  const account = await ensureFreshAccount(this);
  await loginWithCredentials(this, '', account.password);
});

When('the user logs in with an empty password', async function () {
  const account = await ensureFreshAccount(this);
  await loginWithCredentials(this, account.username, '');
});

When('the user logs out', async function () {
  await loginWithValidCredentials(this);
  const profilePage = PageFactory.profile(this.page);
  await profilePage.expectOpened();

  await profilePage.logout();
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
  await PageFactory.login(this.page).expectLoggedIn();
});

Then('the dashboard is displayed', async function () {
  await PageFactory.login(this.page).expectLoggedIn();
});

Then('the login error message is displayed', async function () {
  await PageFactory.login(this.page).expectLoginErrorVisible();
});

Then('the user remains on the login page', async function () {
  await PageFactory.login(this.page).expectOnLoginPage();
});

Then('the user is redirected to the login page', async function () {
  await PageFactory.profile(this.page).expectRedirectedToLogin();
});

Then('registration is successful', async function () {
  expect(this.account?.userId).toBeTruthy();
});

Then('the registration error message is displayed', async function () {
  await PageFactory.register(this.page).expectRegistrationErrorVisible();
});
