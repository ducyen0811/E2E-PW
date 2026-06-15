import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

Given('the user is on the Modal Dialogs page', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.open();
  await modalDialogs.expectLoaded();
});

When('the user opens the small modal dialog', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.openSmallModal();
});

When('the user opens the large modal dialog', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.openLargeModal();
});

When('the user closes the modal dialog', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.closeModal();
});

Then('the small modal dialog is displayed', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.expectSmallModalDisplayed();
});

Then('the large modal dialog is displayed', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.expectLargeModalDisplayed();
});

Then('the Modal Dialogs page remains visible', async function () {
  const modalDialogs = PageFactory.modalDialogs(this.page);
  await modalDialogs.expectLoaded();
});
