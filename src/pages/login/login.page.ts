export abstract class LoginPage {
  abstract open(): Promise<void>;
  abstract login(email: string, password: string): Promise<void>;
}