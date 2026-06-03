import { setWorldConstructor, World, ITestCaseHookParameter } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';
import type { DemoQaAccount } from '../utils/demoqa-account';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  testData: Record<string, any> = {};
  account?: DemoQaAccount;
  result?: ITestCaseHookParameter;
  scenario?: any;
}

setWorldConstructor(CustomWorld);
