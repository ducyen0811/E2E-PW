import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';
import type { TextBoxData } from '../pages/elements/text-box.page';
import type { WebTableRecord } from '../pages/elements/web-tables.page';

const textBoxData: TextBoxData = {
  fullName: 'Demo QA User',
  email: 'demo.qa.user@example.com',
  currentAddress: '123 Current Street',
  permanentAddress: '456 Permanent Avenue'
};

const webTableRecord: WebTableRecord = {
  firstName: 'Taylor',
  lastName: 'Nguyen',
  email: 'taylor.nguyen@example.com',
  age: '29',
  salary: '75000',
  department: 'QA'
};

const editedWebTableRecord: WebTableRecord = {
  ...webTableRecord,
  salary: '82000',
  department: 'Automation'
};

Given('the user is on the Text Box page', async function () {
  const textBox = PageFactory.textBox(this.page);
  await textBox.open();
  await textBox.expectLoaded();
});

When('the user submits the text box form with valid data', async function () {
  await PageFactory.textBox(this.page).submit(textBoxData);
});

Then('the submitted text box output displays the correct data', async function () {
  await PageFactory.textBox(this.page).expectSubmittedData(textBoxData);
});

Given('the user is on the Check Box page', async function () {
  const checkBox = PageFactory.checkBox(this.page);
  await checkBox.open();
  await checkBox.expectLoaded();
});

When('the user selects the Home checkbox', async function () {
  await PageFactory.checkBox(this.page).selectHome();
});

Then('the selected checkbox results are displayed', async function () {
  await PageFactory.checkBox(this.page).expectHomeSelected();
});

Given('the user is on the Radio Button page', async function () {
  const radioButton = PageFactory.radioButton(this.page);
  await radioButton.open();
  await radioButton.expectLoaded();
});

When('the user selects each available radio button option', async function () {
  await PageFactory.radioButton(this.page).selectAvailableOptions();
});

Then('each selected radio button result is displayed', async function () {
  await PageFactory.radioButton(this.page).expectAvailableOptionsSelected();
});

Given('the user is on the Web Tables page', async function () {
  const webTables = PageFactory.webTables(this.page);
  await webTables.open();
  await webTables.expectLoaded();
});

When('the user adds a web table record', async function () {
  await PageFactory.webTables(this.page).addRecord(webTableRecord);
});

When('the user edits the web table record', async function () {
  await PageFactory.webTables(this.page).editRecord(webTableRecord.email, editedWebTableRecord);
});

When('the user deletes the web table record', async function () {
  await PageFactory.webTables(this.page).deleteRecord(editedWebTableRecord.email);
});

Then('the web table record is removed', async function () {
  await PageFactory.webTables(this.page).expectRecordRemoved(editedWebTableRecord.email);
});

Given('the user is on the Buttons page', async function () {
  const buttons = PageFactory.buttons(this.page);
  await buttons.open();
  await buttons.expectLoaded();
});

When('the user performs all button click actions', async function () {
  await PageFactory.buttons(this.page).performAllClickActions();
});

Then('all button click messages are displayed', async function () {
  await PageFactory.buttons(this.page).expectAllClickMessages();
});

Given('the user is on the Links page', async function () {
  const links = PageFactory.links(this.page);
  await links.open();
  await links.expectLoaded();
});

When('the user opens the Home link in a new tab', async function () {
  await PageFactory.links(this.page).openHomeLinkAndExpectHomePage();
});

Then('the Links page remains visible', async function () {
  await PageFactory.links(this.page).expectLoaded();
});

When('the user opens each API response link', async function () {
  await PageFactory.links(this.page).openApiResponseLinks();
});

Then('each API response message is displayed', async function () {
  await PageFactory.links(this.page).expectApiResponseMessages();
});

Given('the user is on the Broken Links - Images page', async function () {
  const brokenLinksImages = PageFactory.brokenLinksImages(this.page);
  await brokenLinksImages.open();
  await brokenLinksImages.expectLoaded();
});

Then('the valid and broken images are displayed correctly', async function () {
  await PageFactory.brokenLinksImages(this.page).expectImagesStatus();
});

Then('the valid link navigates to the home page', async function () {
  await PageFactory.brokenLinksImages(this.page).expectValidLinkNavigatesHome();
});

Then('the broken link navigates to an error page', async function () {
  await PageFactory.brokenLinksImages(this.page).expectBrokenLinkNavigatesToErrorPage();
});

Given('the user is on the Upload and Download page', async function () {
  const uploadDownload = PageFactory.uploadDownload(this.page);
  await uploadDownload.open();
  await uploadDownload.expectLoaded();
});

When('the user downloads the sample file', async function () {
  await PageFactory.uploadDownload(this.page).downloadSampleFile();
});

When('the user uploads a file', async function () {
  await PageFactory.uploadDownload(this.page).uploadFile();
});

Then('the uploaded file path is displayed', async function () {
  await PageFactory.uploadDownload(this.page).expectUploadedFilePath();
});

Given('the user is on the Dynamic Properties page', async function () {
  const dynamicProperties = PageFactory.dynamicProperties(this.page);
  await dynamicProperties.open();
  await dynamicProperties.expectLoaded();
});

Then('the dynamic buttons reach their expected states', async function () {
  await PageFactory.dynamicProperties(this.page).expectDynamicStates();
});
