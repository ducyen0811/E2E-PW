import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

Given('the user is on the Sortable page', async function () {
  const sortable = PageFactory.sortable(this.page);
  await sortable.open();
  await sortable.expectLoaded();
});

When('the user switches to the sortable grid', async function () {
  await PageFactory.sortable(this.page).switchToGrid();
});

Then('the sortable list and grid items are draggable', async function () {
  await PageFactory.sortable(this.page).expectSortableItemsReady();
});

Given('the user is on the Selectable page', async function () {
  const selectable = PageFactory.selectable(this.page);
  await selectable.open();
  await selectable.expectLoaded();
});

When('the user selects multiple selectable list items', async function () {
  await PageFactory.selectable(this.page).selectMultipleItems();
});

Then('the selected list items are highlighted', async function () {
  await PageFactory.selectable(this.page).expectSelectedItems();
});

Given('the user is on the Resizable page', async function () {
  const resizable = PageFactory.resizable(this.page);
  await resizable.open();
  await resizable.expectLoaded();
});

When('the user resizes the restricted box', async function () {
  await PageFactory.resizable(this.page).resizeRestrictedBox();
});

Then('the restricted box size is increased', async function () {
  await PageFactory.resizable(this.page).expectRestrictedBoxIncreased();
});

Given('the user is on the Droppable page', async function () {
  const droppable = PageFactory.droppable(this.page);
  await droppable.open();
  await droppable.expectLoaded();
});

When('the user drops the draggable item into the drop area', async function () {
  await PageFactory.droppable(this.page).dropSimpleItem();
});

Then('the drop area accepts the draggable item', async function () {
  await PageFactory.droppable(this.page).expectSimpleItemDropped();
});

Given('the user is on the Dragabble page', async function () {
  const dragabble = PageFactory.dragabble(this.page);
  await dragabble.open();
  await dragabble.expectLoaded();
});

When('the user drags the simple drag box', async function () {
  await PageFactory.dragabble(this.page).dragSimpleBox();
});

Then('the simple drag box position is changed', async function () {
  await PageFactory.dragabble(this.page).expectSimpleBoxMoved();
});
