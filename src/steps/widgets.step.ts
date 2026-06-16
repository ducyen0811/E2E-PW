import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

Given('the user is on the Accordian page', async function () {
  const accordian = PageFactory.accordian(this.page);
  await accordian.open();
  await accordian.expectLoaded();
});

Then('the first accordian section is expanded by default', async function () {
  await PageFactory.accordian(this.page).expectFirstSectionExpanded();
});

When('the user opens the second accordian section', async function () {
  await PageFactory.accordian(this.page).openSecondSection();
});

Then('the second accordian section content is displayed', async function () {
  await PageFactory.accordian(this.page).expectSecondSectionExpanded();
});

When('the user opens the third accordian section', async function () {
  await PageFactory.accordian(this.page).openThirdSection();
});

Then('the third accordian section content is displayed', async function () {
  await PageFactory.accordian(this.page).expectThirdSectionExpanded();
});

Given('the user is on the Auto Complete page', async function () {
  const autoComplete = PageFactory.autoComplete(this.page);
  await autoComplete.open();
  await autoComplete.expectLoaded();
});

When('the user selects multiple auto-complete colors', async function () {
  await PageFactory.autoComplete(this.page).selectMultipleColors();
});

When('the user selects a single auto-complete color', async function () {
  await PageFactory.autoComplete(this.page).selectSingleColor();
});

Then('the selected auto-complete colors are displayed', async function () {
  await PageFactory.autoComplete(this.page).expectSelectedColors();
});

Given('the user is on the Date Picker page', async function () {
  const datePicker = PageFactory.datePicker(this.page);
  await datePicker.open();
  await datePicker.expectLoaded();
});

When('the user sets the date picker date', async function () {
  await PageFactory.datePicker(this.page).setDate();
});

When('the user sets the date and time picker value', async function () {
  await PageFactory.datePicker(this.page).setDateAndTime();
});

Then('the date picker values are updated', async function () {
  await PageFactory.datePicker(this.page).expectUpdatedValues();
});

Given('the user is on the Slider page', async function () {
  const slider = PageFactory.slider(this.page);
  await slider.open();
  await slider.expectLoaded();
});

When('the user moves the slider to {int}', async function (value: number) {
  await PageFactory.slider(this.page).moveTo(value);
});

Then('the slider value should be {int}', async function (value: number) {
  await PageFactory.slider(this.page).expectValue(value);
});

Given('the user is on the Progress Bar page', async function () {
  const progressBar = PageFactory.progressBar(this.page);
  await progressBar.open();
  await progressBar.expectLoaded();
});

When('the user starts the progress bar', async function () {
  await PageFactory.progressBar(this.page).start();
});

Then('the progress bar reaches 100 percent', async function () {
  await PageFactory.progressBar(this.page).expectComplete();
});

When('the user resets the progress bar', async function () {
  await PageFactory.progressBar(this.page).reset();
});

Then('the progress bar returns to 0 percent', async function () {
  await PageFactory.progressBar(this.page).expectReset();
});

Given('the user is on the Tabs page', async function () {
  const tabs = PageFactory.tabs(this.page);
  await tabs.open();
  await tabs.expectLoaded();
});

Then('the What tab content is displayed', async function () {
  await PageFactory.tabs(this.page).expectWhatTab();
});

When('the user opens the Origin tab', async function () {
  await PageFactory.tabs(this.page).openOriginTab();
});

Then('the Origin tab content is displayed', async function () {
  await PageFactory.tabs(this.page).expectOriginTab();
});

When('the user opens the Use tab', async function () {
  await PageFactory.tabs(this.page).openUseTab();
});

Then('the Use tab content is displayed', async function () {
  await PageFactory.tabs(this.page).expectUseTab();
});

Given('the user is on the Tool Tips page', async function () {
  const toolTips = PageFactory.toolTips(this.page);
  await toolTips.open();
  await toolTips.expectLoaded();
});

When('the user hovers over the tooltip button', async function () {
  await PageFactory.toolTips(this.page).hoverButton();
});

Then('the button tooltip is displayed', async function () {
  await PageFactory.toolTips(this.page).expectButtonTooltip();
});

When('the user hovers over the tooltip input', async function () {
  await PageFactory.toolTips(this.page).hoverInput();
});

Then('the input tooltip is displayed', async function () {
  await PageFactory.toolTips(this.page).expectInputTooltip();
});

Given('the user is on the Menu page', async function () {
  const menu = PageFactory.menu(this.page);
  await menu.open();
  await menu.expectLoaded();
});

When('the user hovers through the nested menu', async function () {
  await PageFactory.menu(this.page).hoverNestedMenu();
});

Then('the nested menu items are displayed', async function () {
  await PageFactory.menu(this.page).expectNestedItemsVisible();
});

Given('the user is on the Select Menu page', async function () {
  const selectMenu = PageFactory.selectMenu(this.page);
  await selectMenu.open();
  await selectMenu.expectLoaded();
});

When('the user selects values from the select menus', async function () {
  await PageFactory.selectMenu(this.page).selectValues();
});

Then('the select menu values are displayed', async function () {
  await PageFactory.selectMenu(this.page).expectSelectedValues();
});
