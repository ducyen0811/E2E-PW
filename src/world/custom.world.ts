import { setWorldConstructor, World, ITestCaseHookParameter } from '@cucumber/cucumber';
import { APIRequestContext, APIResponse, Browser, Page } from '@playwright/test';
import type { DemoQaAccount } from '../utils/demoqa-account';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  api!: APIRequestContext;
  apiResponse?: APIResponse;
  testData: Record<string, any> = {};
  account?: DemoQaAccount;
  result?: ITestCaseHookParameter;
  scenario?: any;
}

setWorldConstructor(CustomWorld);
