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

const edgeCasePracticeFormData: PracticeFormData = {
  firstName: "Anne-Marie",
  lastName: "O'Connor Smith",
  email: 'manual.qa.edge@example.com',
  gender: 'Female',
  mobile: '0912345678'
};

When('the user submits the practice form with valid data', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.open();
  await practiceForm.submit(validPracticeFormData);
});

When('the user submits the practice form with edge-case data', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.open();
  await practiceForm.submit(edgeCasePracticeFormData);
});

When('the user submits the empty practice form', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.open();
  await practiceForm.submitEmptyForm();
});

When('the user submits the practice form with a short mobile number', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.open();
  await practiceForm.submitWithShortMobileNumber();
});

Then('the submitted form modal displays the correct data', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.expectSubmittedData(validPracticeFormData);
});

Then('the submitted form modal displays the edge-case data', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.expectSubmittedData(edgeCasePracticeFormData);
});

Then('the practice form required field validation is displayed', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.expectRequiredFieldValidation();
});
