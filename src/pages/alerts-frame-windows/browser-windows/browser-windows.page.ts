export abstract class BrowserWindowsPage {
  abstract open(): Promise<void>;
  abstract expectLoaded(): Promise<void>;
  abstract openNewTabAndExpectSamplePage(): Promise<void>;
  abstract openNewWindowAndExpectSamplePage(): Promise<void>;
  abstract openNewMessageWindowAndExpectMessage(): Promise<void>;
  abstract openTwoNewTabsAndExpectSamplePages(): Promise<void>;
}
