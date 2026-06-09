# PLWR-TypeScr-core

A modern, lightweight **Playwright + Cucumber + TypeScript** automation testing framework for DemoQA E2E testing, using BDD feature files, Page Object Model, desktop/mobile page implementations, screenshots, and HTML/JSON reports.

## Features

**Core Features:**
- **BDD Framework**: Cucumber with Gherkin syntax. Current feature files use Vietnamese syntax via `# language: vi`.
- **Playwright Automation**: Chromium browser execution with configurable headed/headless mode.
- **Desktop/Mobile Support**: `DEVICE=desktop` uses a 1440x900 viewport; `DEVICE=mobile` uses the Playwright iPhone 14 profile.
- **Page Object Model**: Step definitions call page objects instead of putting UI logic directly inside steps.
- **PageFactory Pattern**: `PageFactory` selects desktop or mobile page implementations based on viewport width.
- **Relative Navigation**: Browser contexts are created with `baseURL`, so page objects can use `page.goto('/path')`.
- **Automatic Screenshots**: Failed scenarios attach screenshots to the Cucumber report.
- **AfterStep Hook**: Failed steps can attach extra error context.
- **Reports**: Cucumber JSON/HTML reports are generated under `reports/`.
- **Environment Configuration**: Runtime options are controlled through `.env`.
- **TypeScript Support**: Step definitions, hooks, config, and page objects are written in TypeScript.

## Prerequisites

- **Node.js** v16+ recommended v18+
- **npm** v8+

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update a `.env` file in the project root:

```properties
BASE_URL=https://demoqa.com
HEADLESS=false
DEVICE=desktop
WAIT_MS=5000
NAVIGATION_TIMEOUT_MS=30000
PARALLEL=2
```

**Configuration Options:**
- `BASE_URL` - Base application URL. Required.
- `HEADLESS` - Run browser in headless mode: `true` or `false`.
- `DEVICE` - Target device: `desktop` or `mobile`.
- `WAIT_MS` - Default timeout for locators/actions.
- `NAVIGATION_TIMEOUT_MS` - Default timeout for page navigation.
- `PARALLEL` - Parallel worker count used by runner/CLI flows.

## Framework Structure

```text
E2E-PW/
|-- src/
|   |-- config/
|   |   |-- driver.factory.ts              # Creates browser/context/page and applies baseURL/timeouts
|   |   `-- env.ts                         # Reads .env values
|   |-- features/
|   |   |-- auth.feature                   # Login/logout/register scenarios
|   |   |-- bookstore.feature              # Book search/collection scenarios
|   |   |-- browser-windows.feature        # New tab/window popup scenarios
|   |   `-- forms.feature                  # Practice form scenario
|   |-- hooks/
|   |   |-- before.ts                      # Creates page before each scenario
|   |   |-- after.ts                       # Screenshots, browser close, account cleanup
|   |   `-- afterStep.ts                   # Per-step failure attachment
|   |-- pages/
|   |   |-- base.page.ts                   # Shared base page helper
|   |   |-- page.factory.ts                # Returns the correct page object implementation
|   |   |-- browser-windows/
|   |   |   |-- browser-windows.page.ts    # Abstract contract
|   |   |   |-- browser-windows.desktop.ts # Desktop implementation
|   |   |   `-- browser-windows.mobile.ts  # Mobile implementation
|   |   |-- bookstore/
|   |   |   |-- books.page.ts              # Abstract contract
|   |   |   |-- books.desktop.ts           # Desktop implementation
|   |   |   |-- books.mobile.ts            # Mobile implementation
|   |   |   |-- book.detail.page.ts        # Book detail actions
|   |   |   `-- profile.page.ts            # Profile/book collection actions
|   |   |-- forms/
|   |   |   `-- practice-form.page.ts      # Practice form page object
|   |   |-- login/
|   |   |   |-- login.page.ts              # Abstract contract
|   |   |   |-- login.desktop.ts           # Desktop implementation
|   |   |   `-- login.mobile.ts            # Mobile implementation
|   |   `-- register/
|   |       |-- register.page.ts           # Abstract contract
|   |       |-- register.desktop.ts        # Desktop implementation
|   |       `-- register.mobile.ts         # Mobile implementation
|   |-- steps/
|   |   |-- auth.step.ts                   # Authentication step definitions
|   |   |-- bookstore.step.ts              # Bookstore step definitions
|   |   |-- browser-windows.step.ts        # Browser windows step definitions
|   |   `-- forms.step.ts                  # Form step definitions
|   |-- test-data/
|   |   `-- user.ts                        # Test user data
|   |-- utils/
|   |   |-- demoqa-account.ts              # DemoQA account helper
|   |   `-- screenshot.ts                  # Screenshot helper
|   `-- world/
|       `-- custom.world.ts                # Cucumber World object
|-- reports/
|   |-- html/                              # Generated HTML reports
|   |-- json/                              # Generated JSON reports
|   `-- screenshots/                       # Failure screenshots
|-- test-results/                          # Historical/generated test results
|-- cucumber.js                            # Cucumber configuration
|-- generate-cucumber-report.ts            # Report helper
|-- runner.js                              # Optional advanced runner
|-- package.json                           # Scripts and dependencies
|-- tsconfig.json                          # TypeScript config
`-- README.md
```

## Running Tests

### Quick Start

```bash
npm run test
```

This cleans old report output and runs all feature files through `cucumber-js`.

### Using npm Scripts

```bash
# Run all tests
npm run test

# Run auth feature scenarios without report output
npm run test:auth

# Run bookstore feature scenarios without report output
npm run test:bookstore

# Run forms feature scenarios without report output
npm run test:forms

# Run auth/bookstore/forms with report output
npm run test:auth:report
npm run test:bookstore:report
npm run test:forms:report

# Run tagged suites
npm run test:single
npm run test:parallel

# Run all tests by device
npm run test:desktop
npm run test:mobile

# Run the custom runner
npm run runner

# Clean report output
npm run clean
```

### Using Cucumber Directly

```bash
# Run a specific tag
npx cucumber-js --tags "@auth"

# Run smoke tests
npx cucumber-js --tags "@smoke"

# Run browser windows scenarios
npx cucumber-js --tags "@browser-windows"

# Exclude tests
npx cucumber-js --tags "not @negative"

# Run on desktop/mobile with cross-env
npx cross-env DEVICE=desktop cucumber-js --tags "@smoke"
npx cross-env DEVICE=mobile cucumber-js --tags "@smoke"
```

### Runner Usage

`runner.js` is available for custom execution flows:

```bash
node runner.js
node runner.js --help
node runner.js --tags @smoke
node runner.js --tags @auth --device mobile
node runner.js --tags @critical --parallel 4 --headless
```

## Current Tags

| Tag | Purpose |
|-----|---------|
| `@smoke` | Fast sanity scenarios |
| `@auth` | Authentication feature |
| `@login` | Login scenarios |
| `@logout` | Logout scenario |
| `@register` | Register scenarios |
| `@negative` | Negative validation scenarios |
| `@bookstore` | Bookstore feature |
| `@forms` | Practice form feature |
| `@browser-windows` | New tab/window feature |
| `@single` | Sequential test grouping if used |
| `@parallel` | Parallel-safe test grouping if used |

## Writing Tests

### Feature File Pattern

Feature files live in `src/features/`. This repo currently uses Vietnamese Gherkin:

```gherkin
# language: vi
Tinh nang: Cua so trinh duyet

  @smoke @browser-windows
  Kich ban: Mo tab moi tu trang Browser Windows
    Cho nguoi dung dang o trang Browser Windows
    Khi nguoi dung mo tab moi tu trang Browser Windows
    Thi trang Browser Windows van hien thi binh thuong
```

Keep feature steps readable and business-focused. UI details should stay in page objects.

### Step Definition Pattern

Step files live in `src/steps/`. A step should call `PageFactory`, then delegate logic to a page object:

```typescript
Given('nguoi dung dang o trang Browser Windows', async function () {
  const browserWindows = PageFactory.browserWindows(this.page);
  await browserWindows.open();
  await browserWindows.expectLoaded();
});
```

### Page Object Pattern

Each feature area can have:

- An abstract contract, for example `browser-windows.page.ts`.
- A desktop implementation, for example `browser-windows.desktop.ts`.
- A mobile implementation, for example `browser-windows.mobile.ts`.
- A factory method in `page.factory.ts`.

Example:

```typescript
export abstract class BrowserWindowsPage {
  abstract open(): Promise<void>;
  abstract expectLoaded(): Promise<void>;
  abstract openNewTabAndExpectSamplePage(): Promise<void>;
}
```

The implementation contains the real Playwright logic:

```typescript
async open(): Promise<void> {
  await this.page.goto('/browser-windows', { waitUntil: 'domcontentloaded' });
}

async expectLoaded(): Promise<void> {
  await expect(this.page.locator('h1')).toHaveText('Browser Windows');
  await expect(this.page.locator('#tabButton')).toBeVisible();
}
```

### Popup/New Tab Pattern

When clicking opens a new tab or window, wait for the `popup` event before clicking:

```typescript
const popupPromise = this.page.waitForEvent('popup');
await this.page.locator('#tabButton').click();
const popup = await popupPromise;

await popup.waitForLoadState('domcontentloaded');
await expect(popup.locator('#sampleHeading')).toHaveText('This is a sample page');
await popup.close();
```

Use `this.page` for the current tab. Use `popup` for the newly opened tab/window.

## Reports

Report output is controlled by `cucumber.js`.

When `NO_REPORT` is not `true`, Cucumber writes:

- JSON report: `reports/json/cucumber-report-<id>.json`
- HTML report: `reports/html/cucumber-report-<id>.html`

Failed scenarios attach screenshots through `src/hooks/after.ts`.

Some npm scripts set `NO_REPORT=true` to run faster:

```bash
npm run test:auth
npm run test:bookstore
npm run test:forms
```

Use the `*:report` scripts when you want report files:

```bash
npm run test:auth:report
npm run test:bookstore:report
npm run test:forms:report
```

## Debugging

### Run Headed

Set this in `.env`:

```properties
HEADLESS=false
```

Then run:

```bash
npm run test:desktop
```

### Run One Area

```bash
npx cucumber-js --tags "@browser-windows"
```

### Increase Timeouts

Update `.env`:

```properties
WAIT_MS=10000
NAVIGATION_TIMEOUT_MS=60000
```

### Override Device Without Editing `.env`

```bash
npx cross-env DEVICE=mobile cucumber-js --tags "@smoke"
```

## Troubleshooting

### `Cannot navigate to invalid URL`

Check that `BASE_URL` exists in `.env`. `driver.factory.ts` sets `baseURL`, so page objects should normally use relative paths such as:

```typescript
await this.page.goto('/login');
```

### Selector not found or `toBeVisible()` timeout

- Confirm the selector exists on the current page.
- Confirm the selected device layout does not hide or change the element.
- Add a page-specific wait only when the element is rendered dynamically.

### Popup test hangs

For new tab/window flows, create the popup promise before the click:

```typescript
const popupPromise = this.page.waitForEvent('popup');
await this.page.locator('#tabButton').click();
const popup = await popupPromise;
```

### Parallel tests fail but single tests pass

- Check for shared test data or shared DemoQA accounts.
- Reduce worker count.
- Put dependent tests under sequential execution.

## Contributing

1. Add or update feature files in `src/features/`.
2. Add step definitions in `src/steps/`.
3. Put UI logic in `src/pages/`, not directly in steps.
4. Update `PageFactory` when adding desktop/mobile page implementations.
5. Use tags that match the feature area.
6. Run the related test script before committing.

## License

ISC
