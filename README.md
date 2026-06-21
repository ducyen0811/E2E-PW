# E2E Playwright Automation Framework

A lightweight **Playwright + Cucumber + TypeScript** end-to-end automation framework for DemoQA. The project uses BDD feature files, Page Object Model, desktop/mobile page implementations, automatic screenshots, and Cucumber HTML/JSON reports.

## Features

- **BDD with Cucumber**: readable Gherkin scenarios under `src/features/`.
- **Playwright automation**: Chromium browser execution with configurable headed/headless mode.
- **Page Object Model**: locators, actions, and assertions live in page objects instead of step definitions.
- **PageFactory pattern**: `PageFactory` returns desktop or mobile page implementations based on viewport width.
- **Desktop/mobile support**: desktop uses a 1440x900 viewport; mobile uses Playwright's iPhone 14 profile.
- **Relative navigation**: browser contexts use `baseURL`, so page objects can call `page.goto('/path')`.
- **Screenshots on failure**: failed scenarios attach screenshots to reports.
- **Reports**: Cucumber JSON/HTML reports are generated under `reports/`.
- **Continuous Integration**: GitHub Actions checks TypeScript, runs API/UI tests, and uploads reports for every run.
- **Environment configuration**: runtime options are controlled through `.env`.

## Prerequisites

- Node.js v16+ recommended v18+
- npm v8+

## Installation

```bash
npm install
```

Create or update `.env` in the project root:

```properties
BASE_URL=https://demoqa.com
HEADLESS=false
DEVICE=desktop
WAIT_MS=5000
NAVIGATION_TIMEOUT_MS=30000
PARALLEL=2
```

## Project Structure

```text
E2E-PW/
|-- docs/
|   |-- Bug_Report_Template.md
|   |-- Manual_Test_Cases.xlsx
|   `-- Test_Plan.md
|-- src/
|   |-- config/
|   |   |-- driver.factory.ts
|   |   `-- env.ts
|   |-- features/
|   |   |-- interactions/
|   |   |-- widgets/
|   |   |-- auth.feature
|   |   |-- alerts.feature
|   |   |-- bookstore.feature
|   |   |-- broken-links-images.feature
|   |   |-- browser-windows.feature
|   |   |-- buttons.feature
|   |   |-- check-box.feature
|   |   |-- dynamic-properties.feature
|   |   |-- forms.feature
|   |   |-- frames.feature
|   |   |-- links.feature
|   |   |-- modal-dialogs.feature
|   |   |-- nested-frames.feature
|   |   |-- radio-button.feature
|   |   |-- text-box.feature
|   |   |-- upload-download.feature
|   |   `-- web-tables.feature
|   |-- hooks/
|   |   |-- before.ts
|   |   |-- after.ts
|   |   `-- afterStep.ts
|   |-- pages/
|   |   |-- page.factory.ts
|   |   |-- alerts-frame-windows/
|   |   |   |-- alerts/
|   |   |   |-- browser-windows/
|   |   |   |-- frames/
|   |   |   |-- modal-dialogs/
|   |   |   `-- nested-frames/
|   |   |-- book-store-application/
|   |   |   |-- bookstore/
|   |   |   |-- login/
|   |   |   |-- profile/
|   |   |   `-- register/
|   |   |-- elements/
|   |   |   |-- buttons/
|   |   |   |-- check-box/
|   |   |   |-- text-box/
|   |   |   `-- ...
|   |   |-- forms/
|   |   |-- interactions/
|   |   |   |-- dragabble/
|   |   |   |-- droppable/
|   |   |   |-- resizable/
|   |   |   |-- selectable/
|   |   |   `-- sortable/
|   |   |-- widgets/
|   |   |   |-- accordian/
|   |   |   |-- auto-complete/
|   |   |   |-- date-picker/
|   |   |   |-- menu/
|   |   |   |-- progress-bar/
|   |   |   |-- select-menu/
|   |   |   |-- slider/
|   |   |   |-- tabs/
|   |   |   `-- tool-tips/
|   |   `-- ...
|   |-- steps/
|   |   |-- alerts.step.ts
|   |   |-- auth.step.ts
|   |   |-- bookstore.step.ts
|   |   |-- browser-windows.step.ts
|   |   |-- elements.step.ts
|   |   |-- forms.step.ts
|   |   |-- frames.step.ts
|   |   |-- interactions.step.ts
|   |   |-- modal-dialogs.step.ts
|   |   `-- widgets.step.ts
|   |-- test-data/
|   |-- utils/
|   `-- world/
|-- cucumber.js
|-- generate-cucumber-report.ts
|-- package.json
|-- runner.js
|-- tsconfig.json
`-- README.md
```

## Running Tests

```bash
# Run all tests
npm run test

# Run feature groups (JSON and HTML reports are always generated)
npm run test:auth
npm run test:bookstore
npm run test:api
npm run test:book-store-application
npm run test:alerts
npm run test:alerts-frame-windows
npm run test:elements
npm run test:widgets
npm run test:interactions
npm run test:forms
npm run test:frames
npm run test:nested-frames
npm run test:modal-dialogs

# Run by device
npm run test:desktop
npm run test:mobile

# Run with the custom runner
npm run runner
```

All test commands write an HTML report to `reports/html/`, even when all scenarios pass.
Use `npm run test:api:no-report` only when report output is not needed.

Run Cucumber directly:

```bash
npx cucumber-js --tags "@auth"
npx cucumber-js --tags "@api"
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@book-store-application"
npx cucumber-js --tags "@alerts-frame-windows"
npx cucumber-js --tags "@alerts"
npx cucumber-js --tags "@elements"
npx cucumber-js --tags "@widgets"
npx cucumber-js --tags "@interactions"
npx cucumber-js --tags "@browser-windows"
npx cucumber-js --tags "@modal-dialogs"
npx cucumber-js --tags "@nested-frames"
npx cucumber-js --tags "not @negative"
```

On Windows PowerShell, if script execution blocks `npm` or `npx`, use the `.cmd` shims:

```bash
npm.cmd run test:frames
npx.cmd tsc --noEmit
```

## Current Tags

| Tag | Purpose |
|-----|---------|
| `@smoke` | Fast sanity scenarios |
| `@auth` | Authentication scenarios |
| `@login` | Login scenarios |
| `@logout` | Logout scenario |
| `@register` | Register scenarios |
| `@negative` | Negative validation scenarios |
| `@book-store-application` | Book Store Application scenarios |
| `@bookstore` | Bookstore scenarios |
| `@api` | Book Store REST API scenarios |
| `@bookstore-api` | Book Store API contract and collection scenarios |
| `@alerts-frame-windows` | Alerts, Frame & Windows scenarios |
| `@alerts` | JavaScript alert scenarios |
| `@elements` | Elements scenarios |
| `@text-box` | Text Box scenario |
| `@check-box` | Check Box scenario |
| `@radio-button` | Radio Button scenario |
| `@web-tables` | Web Tables scenario |
| `@buttons` | Buttons scenario |
| `@links` | Links scenario |
| `@broken-links-images` | Broken Links - Images scenario |
| `@upload-download` | Upload and Download scenario |
| `@dynamic-properties` | Dynamic Properties scenario |
| `@forms` | Practice form scenarios |
| `@widgets` | Widgets scenarios |
| `@accordian` | Accordian widget scenario |
| `@auto-complete` | Auto Complete widget scenario |
| `@date-picker` | Date Picker widget scenario |
| `@slider` | Slider widget scenario |
| `@progress-bar` | Progress Bar widget scenario |
| `@tabs` | Tabs widget scenario |
| `@tool-tips` | Tool Tips widget scenario |
| `@menu` | Menu widget scenario |
| `@select-menu` | Select Menu widget scenario |
| `@interactions` | Interactions scenarios |
| `@sortable` | Sortable interaction scenario |
| `@selectable` | Selectable interaction scenario |
| `@resizable` | Resizable interaction scenario |
| `@droppable` | Droppable interaction scenario |
| `@dragabble` | Dragabble interaction scenario |
| `@browser-windows` | New tab/window scenarios |
| `@frames` | Frames scenarios |
| `@nested-frames` | Nested frames scenario |
| `@modal-dialogs` | Modal Dialogs scenarios |
| `@single` | Sequential test grouping if used |
| `@parallel` | Parallel-safe test grouping if used |

## Writing Tests

Feature files live in `src/features/`:

```gherkin
Feature: Nested Frames

  @smoke @alerts-frame-windows @nested-frames
  Scenario: Verify content inside nested frames
    Given the user is on the Nested Frames page
    Then the parent and child nested frames display their text
```

Step definitions should stay business-focused and delegate UI logic to page objects:

```typescript
Given('the user is on the Nested Frames page', async function () {
  const nestedFrames = PageFactory.nestedFrames(this.page);
  await nestedFrames.open();
  await nestedFrames.expectLoaded();
});
```

Page objects own selectors, actions, and assertions:

```typescript
export class NestedFramesPage {
  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/nestedframes', { waitUntil: 'domcontentloaded' });
  }
}
```

When a page has different desktop/mobile behavior, add:

- `<feature>.page.ts` for shared behavior or contract
- `<feature>.desktop.ts` for desktop-specific behavior
- `<feature>.mobile.ts` for mobile-specific behavior
- a factory method in `src/pages/page.factory.ts`

Grouped DemoQA sections should keep page folders under their section folder, for example:

- `src/pages/elements/text-box/`
- `src/pages/alerts-frame-windows/alerts/`
- `src/pages/alerts-frame-windows/modal-dialogs/`
- `src/pages/widgets/accordian/`
- `src/pages/interactions/droppable/`
- `src/pages/book-store-application/login/`
- `src/pages/book-store-application/profile/`

## Reports

Every test command writes:

- JSON reports to `reports/json/`
- HTML reports to `reports/html/`
- failure screenshots to `reports/screenshots/`

The legacy `:report` aliases remain available and generate the same reports:

```bash
npm run test:auth:report
npm run test:bookstore:report
npm run test:forms:report
```

## Continuous Integration

The workflow at `.github/workflows/ci.yml` runs on pushes to `main`, `master`, or `develop`, on pull requests, manually, and every day at 01:00 Asia/Bangkok time.

CI performs these jobs:

1. `quality-check` installs locked dependencies with `npm ci` and checks TypeScript.
2. `api-tests` runs the Book Store API suite without installing a browser.
3. `ui-tests` installs Chromium and runs seven feature groups with a matrix (up to three groups concurrently).

Every test job uploads HTML/JSON reports, screenshots, and Playwright test results even when tests fail. Open a workflow run in GitHub and download the desired file from its **Artifacts** section. Artifacts are retained for 14 days.

Run the same initial checks locally with:

```bash
npm ci
npm run typecheck
npm run test:api
```

## Test Documentation

- Manual test cases: `docs/Manual_Test_Cases.xlsx`
- Test plan: `docs/Test_Plan.md`
- Bug report template: `docs/Bug_Report_Template.md`

Keep these files updated when adding new scenarios or changing coverage.

## Troubleshooting

### `Cannot navigate to invalid URL`

Confirm `.env` contains:

```properties
BASE_URL=https://demoqa.com
```

### Selector timeout

- Confirm the selector exists on the current page.
- Confirm the desktop/mobile layout does not hide or change the element.
- Move page-specific waits into the relevant page object.

### Popup test hangs

Create the popup promise before clicking:

```typescript
const popupPromise = this.page.waitForEvent('popup');
await this.page.locator('#tabButton').click();
const popup = await popupPromise;
```

## Contributing

1. Add or update feature files in `src/features/`.
2. Add step definitions in `src/steps/`.
3. Put UI logic in `src/pages/`.
4. Update `PageFactory` for new page objects.
5. Update `docs/Manual_Test_Cases.xlsx` and `docs/Test_Plan.md`.
6. Run the related test script before committing.

## License

ISC
