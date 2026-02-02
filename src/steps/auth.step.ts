import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PageFactory } from '../pages/page.factory';
import { users } from '../test-data/user';

When('user logs in', async function () {
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(users.valid.username, users.valid.password);
});

When('user logs in with valid credentials', async function () {
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(users.valid.username, users.valid.password);
});

When('user logs in with invalid password', async function () {
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
});

When('user logs out', async function () {
  const loginPage = PageFactory.login(this.page);
  await loginPage.open();
  await loginPage.login(users.valid.username, users.valid.password);
  await expect(this.page).toHaveURL(/profile|dashboard/);

  await this.page.click('#submit');
});

When('user registers with valid information', async function () {
  const registerPage = PageFactory.register(this.page);
  await registerPage.open();

  const username = `user_${Date.now()}`;
  this.testData.registerUsername = username;

  await registerPage.register('Test', 'User', username, 'P@ssw0rd123');

  try {
    const dialog = await this.page.waitForEvent('dialog', { timeout: 3000 });
    await dialog.accept();
  } catch {}
});

When('user registers with invalid email', async function () {
  const registerPage = PageFactory.register(this.page);
  await registerPage.open();

  await registerPage.register('Test', 'User', 'invalid_email', 'P@ssw0rd123');
});

Then('user should be logged in successfully', async function () {
  await expect(this.page).toHaveURL(/profile|dashboard/);
});

Then('dashboard is displayed', async function () {
  // reuse the same assertion as "user should be logged in successfully"
  await expect(this.page).toHaveURL(/profile|dashboard/);
});

Then('login error message is displayed', async function () {
  await expect(
    this.page.locator('#name, [role="alert"], .error, .alert').first()
  ).toBeVisible();
});

Then('user stays on login page', async function () {
  await expect(this.page).toHaveURL(/login/);
});

Then('user is redirected to login page', async function () {
  await expect(this.page).toHaveURL(/login/);
});

Then('registration is successful', async function () {
  await expect(this.page).toHaveURL(/login|register/);
});

Then('registration error message is displayed', async function () {
  await expect(
    this.page.locator('#name, [role="alert"], .error, .alert').first()
  ).toBeVisible();
});
