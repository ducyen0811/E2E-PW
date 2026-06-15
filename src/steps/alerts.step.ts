import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

const promptText = 'Demo QA prompt';

Given('the user is on the Alerts page', async function () {
  const alerts = PageFactory.alerts(this.page);
  await alerts.open();
  await alerts.expectLoaded();
});

When('the user handles the basic alert', async function () {
  await PageFactory.alerts(this.page).handleBasicAlert();
});

When('the user handles the delayed alert', async function () {
  await PageFactory.alerts(this.page).handleDelayedAlert();
});

When('the user accepts the confirm alert', async function () {
  await PageFactory.alerts(this.page).acceptConfirmAlert();
});

When('the user submits text in the prompt alert', async function () {
  await PageFactory.alerts(this.page).submitPromptAlert(promptText);
});

Then('the alert results are displayed correctly', async function () {
  await PageFactory.alerts(this.page).expectAlertResults(promptText);
});
