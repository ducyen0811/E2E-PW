import { Given, When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';

Given('the user is on the Frames page', async function () {
  const frames = PageFactory.frames(this.page);
  await frames.open();
  await frames.expectLoaded();
});

Then('both Frames page frames display the sample heading', async function () {
  const frames = PageFactory.frames(this.page);
  await frames.expectBothFramesDisplaySampleHeading();
});

Then('the first frame should be larger than the second frame', async function () {
  const frames = PageFactory.frames(this.page);
  await frames.expectFirstFrameLargerThanSecondFrame();
});

When('the user reloads the Frames page', async function () {
  const frames = PageFactory.frames(this.page);
  await frames.reload();
});

Given('the user is on the Nested Frames page', async function () {
  const nestedFrames = PageFactory.nestedFrames(this.page);
  await nestedFrames.open();
  await nestedFrames.expectLoaded();
});

Then('the parent and child nested frames display their text', async function () {
  const nestedFrames = PageFactory.nestedFrames(this.page);
  await nestedFrames.expectNestedFrameContent();
});
