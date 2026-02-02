import { setWorldConstructor, World, ITestCaseHookParameter } from '@cucumber/cucumber';
import { Browser, Page } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  testData: Record<string, any> = {};
  result?: ITestCaseHookParameter;
  scenario?: any;
}

setWorldConstructor(CustomWorld);