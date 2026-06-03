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

When('người dùng gửi biểu mẫu thực hành với dữ liệu hợp lệ', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.open();
  await practiceForm.submit(validPracticeFormData);
});

Then('modal biểu mẫu đã gửi hiển thị đúng dữ liệu', async function () {
  const practiceForm = PageFactory.practiceForm(this.page);
  await practiceForm.expectSubmittedData(validPracticeFormData);
});
