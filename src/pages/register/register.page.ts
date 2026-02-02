export abstract class RegisterPage {
  abstract open(): Promise<void>;

  abstract register(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ): Promise<void>;
}
