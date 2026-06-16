import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';
import type { TextBoxData } from '../pages/elements/text-box/text-box.page';
import type { WebTableRecord } from '../pages/elements/web-tables/web-tables.page';

const textBoxData: TextBoxData = {
  fullName: 'Demo QA User',
  email: 'demo.qa.user@example.com',
  currentAddress: '123 Current Street',
  permanentAddress: '456 Permanent Avenue'
};

const edgeCaseTextBoxData: TextBoxData = {
  fullName: "QA O'Connor-Smith Test User 1234567890",
  email: 'qa.edge.case@example.co',
  currentAddress: 'Apt #5B, 123 Long-Input Street / Block [QA] - ' + 'A'.repeat(100),
  permanentAddress: "Symbols !@#$%^&*()_+-=[]{};':,./<>? and numbers 0123456789"
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

When('the user submits the text box form with edge-case data', async function () {
  await PageFactory.textBox(this.page).submit(edgeCaseTextBoxData);
});

When('the user submits the text box form with an invalid email', async function () {
  await PageFactory.textBox(this.page).submit({
    ...textBoxData,
    email: 'qa+invalid..dots@example..com'
  });
});

Then('the submitted text box output displays the correct data', async function () {
  await PageFactory.textBox(this.page).expectSubmittedData(textBoxData);
});

Then('the submitted text box output displays the edge-case data', async function () {
  await PageFactory.textBox(this.page).expectSubmittedData(edgeCaseTextBoxData);
});

Then('the text box email validation error is displayed', async function () {
  await PageFactory.textBox(this.page).expectEmailValidationError();
});

Given('the user is on the Check Box page', async function () {
  const checkBox = PageFactory.checkBox(this.page);
  await checkBox.open();
  await checkBox.expectLoaded();
});

When('the user selects the Home checkbox', async function () {
  await PageFactory.checkBox(this.page).selectHome();
});

When('the user clears the Home checkbox selection', async function () {
  await PageFactory.checkBox(this.page).clearHome();
});

Then('the selected checkbox results are displayed', async function () {
  await PageFactory.checkBox(this.page).expectHomeSelected();
});

Then('no checkbox results are displayed', async function () {
  await PageFactory.checkBox(this.page).expectNoResultsDisplayed();
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

Then('the disabled radio button cannot be selected', async function () {
  await PageFactory.radioButton(this.page).expectDisabledOptionCannotBeSelected();
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

When('the user tries to add a web table record with an invalid email', async function () {
  await PageFactory.webTables(this.page).tryAddInvalidEmailRecord({
    ...webTableRecord,
    email: 'not-an-email'
  });
});

When('the user deletes the web table record', async function () {
  await PageFactory.webTables(this.page).deleteRecord(editedWebTableRecord.email);
});

Then('the web table record is removed', async function () {
  await PageFactory.webTables(this.page).expectRecordRemoved(editedWebTableRecord.email);
});

Then('the invalid web table record is not added', async function () {
  await PageFactory.webTables(this.page).expectInvalidRecordNotAdded('not-an-email');
});

Given('the user is on the Buttons page', async function () {
  const buttons = PageFactory.buttons(this.page);
  await buttons.open();
  await buttons.expectLoaded();
});

When('the user performs all button click actions', async function () {
  await PageFactory.buttons(this.page).performAllClickActions();
});

When('the user single-clicks the double-click button', async function () {
  await PageFactory.buttons(this.page).singleClickDoubleClickButton();
});

Then('all button click messages are displayed', async function () {
  await PageFactory.buttons(this.page).expectAllClickMessages();
});

Then('the double-click message is not displayed', async function () {
  await PageFactory.buttons(this.page).expectDoubleClickMessageHidden();
});

Given('the user is on the Links page', async function () {
  const links = PageFactory.links(this.page);
  await links.open();
  await links.expectLoaded();
});

When('the user opens the Home link in a new tab', async function () {
  await PageFactory.links(this.page).openHomeLinkAndExpectHomePage();
});

When('the user opens the dynamic Home link in a new tab', async function () {
  await PageFactory.links(this.page).openDynamicHomeLinkAndExpectHomePage();
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

When('the user uploads a file with a complex name', async function () {
  await PageFactory.uploadDownload(this.page).uploadComplexNamedFile();
});

Then('the uploaded file path is displayed', async function () {
  await PageFactory.uploadDownload(this.page).expectUploadedFilePath();
});

Then('the complex uploaded file path is displayed', async function () {
  await PageFactory.uploadDownload(this.page).expectComplexUploadedFilePath();
});

Given('the user is on the Dynamic Properties page', async function () {
  const dynamicProperties = PageFactory.dynamicProperties(this.page);
  await dynamicProperties.open();
  await dynamicProperties.expectLoaded();
});

Then('the dynamic buttons reach their expected states', async function () {
  await PageFactory.dynamicProperties(this.page).expectDynamicStates();
});

Then('the dynamic buttons start in their initial states', async function () {
  await PageFactory.dynamicProperties(this.page).expectInitialStates();
});
