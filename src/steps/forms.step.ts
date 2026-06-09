import { When, Then } from '@cucumber/cucumber';
import { PageFactory } from '../pages/page.factory';
import type { PracticeFormData } from '../pages/forms/practice-form.page';

const validPracticeFormData: PracticeFormData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@example.com',
  gender: 'Male',
  mobile: '0987654321'
};

When('the user submits the practice form with valid data', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.open();
  await practiceForm.submit(validPracticeFormData);
});

Then('the submitted form modal displays the correct data', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.expectSubmittedData(validPracticeFormData);
});
