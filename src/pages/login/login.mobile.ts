import { LoginPage } from './login.page';
import { Page } from '@playwright/test';


const usernameInputXpath = '//input[@placeholder="UserName"]';
const passwordInputXpath = '//input[@placeholder="Password"]';
const loginButtonXpath = '//button[text()="Login"]';

export class LoginMobilePage extends LoginPage {
  constructor(private page: Page) {
    super();
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
     await this.page.fill(usernameInputXpath, username);
    await this.page.fill(passwordInputXpath, password);
    await this.page.click(loginButtonXpath);
  }
}
