export type PracticeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
};

export abstract class PracticeFormPage {
  abstract open(): Promise<void>;
  abstract submit(data: PracticeFormData): Promise<void>;
  abstract submitEmptyForm(): Promise<void>;
  abstract submitWithShortMobileNumber(): Promise<void>;
  abstract expectSubmittedData(data: PracticeFormData): Promise<void>;
  abstract expectRequiredFieldValidation(): Promise<void>;
}
