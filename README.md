# PLWR-TypeScr-core

A modern, lightweight **Playwright + Cucumber + TypeScript** automation testing framework with advanced features for both single and parallel test execution.

## Features

✨ **Core Features:**
- ✅ **BDD Framework**: Cucumber with Gherkin syntax for readable test scenarios
- ✅ **Cross-Platform**: Support for Desktop and Mobile (iPhone 14) testing
- ✅ **Parallel Execution**: Run multiple tests simultaneously for faster execution
- ✅ **Ordered Test Execution**: Run @single tests sequentially first, then @parallel tests in parallel
- ✅ **Automatic Screenshots**: Captures screenshots automatically when steps fail with error messages
- ✅ **AfterStep Hook**: Enhanced failure reporting with per-step error logging and screenshot attachment
- ✅ **HTML Reports**: Beautiful Cucumber HTML reports with embedded screenshots and test results
- ✅ **Smart Report Generation**: Automatically detects and uses the most complete test results (largest JSON file)
- ✅ **Environment Configuration**: Easy setup via `.env` file
- ✅ **Advanced Test Runner**: Flexible CLI runner with multiple execution modes
- ✅ **TypeScript Support**: Full type safety and IntelliSense support
- ✅ **Page Object Model**: Organized page structure with separate desktop and mobile implementations

## Prerequisites

- **Node.js** v16+ (recommended v18+)
- **npm** v8+

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```properties
# Base URL of the application
BASE_URL=https://demoqa.com

# Browser settings
HEADLESS=false
DEVICE=desktop

# Timeouts (milliseconds)
WAIT_MS=5000
NAVIGATION_TIMEOUT_MS=30000

# Parallel execution workers
PARALLEL=2
```

**Configuration Options:**
- `BASE_URL` - The application URL (required)
- `HEADLESS` - Run browser in headless mode (`true`/`false`)
- `DEVICE` - Target device (`desktop` or `mobile`)
- `WAIT_MS` - Timeout for actions/locators (default: 5000ms)
- `NAVIGATION_TIMEOUT_MS` - Timeout for page navigation (default: 30000ms)
- `PARALLEL` - Number of parallel workers (default: 2)

## Framework Structure

```
PLWR-TypeScr-core/
├── src/
│   ├── config/
│   │   ├── driver.factory.ts       # Browser instance creation
│   │   └── env.ts                  # Environment configuration
│   ├── features/
│   │   └── auth.feature           # Cucumber feature files
│   ├── hooks/
│   │   ├── before.ts               # Pre-test setup (browser creation, navigation)
│   │   ├── after.ts                # Post-test teardown (screenshot capture, browser close)
│   │   └── afterStep.ts            # Per-step failure detection with error logging
│   ├── pages/
│   │   ├── base.page.ts            # Base page class with common methods
│   │   ├── page.factory.ts         # Page factory for device selection
│   │   └── login/
│   │       ├── login.page.ts       # Login page interface
│   │       ├── login.desktop.ts    # Desktop-specific implementation
│   │       └── login.mobile.ts     # Mobile-specific implementation
│   │
│   ├── steps/
│   │   └── auth.step.ts           # Step definitions for login scenarios
│   │   └── bookstore.step.ts           # Step definitions for books scenarios 
│   ├── utils/
│   │   └── screenshot.ts           # Screenshot utility for failure capture
│   └── world/
│       └── custom.world.ts         # Cucumber World object definition
├── reports/
│   ├── cucumber.html               # Generated HTML report
│   └── screenshots/                # Screenshots from failed steps
├── .env                            # Environment variables
├── cucumber.js                     # Cucumber configuration
├── runner.js                       # Advanced test runner script
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## Running Tests

### Quick Start

```bash
# Run all tests (uses settings from .env)
node runner.js

# View available options
node runner.js --help
```

### Using npm Scripts

```bash
# Run all tests
npm run test

# Run only @single tagged tests (sequential)
npm run test:single

# Run only @parallel tagged tests (parallel mode)
npm run test:parallel

# Run tests on mobile device
npm run test:mobile

# Run tests on desktop device
npm run test:desktop

# Clean reports folder
npm run clean
```

### Advanced Test Runner (runner.js)

The `runner.js` script provides advanced execution modes:

**Default Mode (Ordered Execution):**
```bash
node runner.js
```
- Runs `@single` tests sequentially (1 worker)
- Then runs `@parallel` tests in parallel mode (from .env setting)
- Generates summary report

**Specific Tags:**
```bash
node runner.js --tags @login
node runner.js --tags @smoke,@critical
```

**Override Settings:**
```bash
node runner.js --device mobile          # Override DEVICE
node runner.js --single                 # Force sequential execution
node runner.js --parallel 4             # Override PARALLEL workers
node runner.js --headless               # Run headless
```

**Combined Options:**
```bash
node runner.js --tags @critical --device mobile --parallel 4
```

### Running Tests with Specific Annotations/Tags

You can filter and run tests using tags in multiple ways:

#### Using runner.js (Recommended)

```bash
# Run specific tag
node runner.js --tags @login

# Run multiple tags (OR logic - tests with either tag)
node runner.js --tags @login,@smoke

# Run multiple tags (AND logic - tests with both tags)
node runner.js --tags "@login and @critical"

# Exclude tags (NOT logic)
node runner.js --tags "@login and not @skip"

# Complex tag expressions
node runner.js --tags "@login or @signup"
node runner.js --tags "(@login or @signup) and not @skip"
```

#### Using npm Scripts

```bash
# Run @single tests (sequential mode)
npm run test:single

# Run @parallel tests (parallel mode)
npm run test:parallel

# Run all tests (default ordered execution: @single then @parallel)
npm run test
```

#### Using Cucumber Directly

```bash
# Run specific tag
npx cucumber-js --tags @login

# Multiple tags
npx cucumber-js --tags "@login and @critical"

# Exclude tags
npx cucumber-js --tags "@login and not @skip"
```

#### Combining Tags with Other Options

```bash
# Run @login tests on mobile, sequentially
node runner.js --tags @login --device mobile --single

# Run @critical tests in parallel with 4 workers, headless
node runner.js --tags @critical --parallel 4 --headless

# Run @smoke tests on desktop
node runner.js --tags @smoke --device desktop
```

### Tag Reference

| Tag | Purpose | Usage |
|-----|---------|-------|
| `@single` | Sequential execution | For dependent/flaky tests |
| `@parallel` | Parallel execution | For independent tests |
| `@smoke` | Quick smoke tests | Fast sanity checks |
| `@critical` | Critical functionality | Important business flows |
| `@login` | Login-related tests | Authentication tests |
| `@signup` | Sign-up tests | Registration flows |
| `@skip` | Skip tests | Disable specific tests |

### Tag Expression Examples

```bash
# Tests tagged with @login
node runner.js --tags @login

# Tests tagged with @login AND @critical
node runner.js --tags "@login and @critical"

# Tests tagged with @login OR @signup
node runner.js --tags "@login or @signup"

# Tests tagged with @login but NOT @skip
node runner.js --tags "@login and not @skip"

# Tests tagged with (@login OR @signup) AND NOT @skip
node runner.js --tags "(@login or @signup) and not @skip"

# Tests tagged with @critical AND @smoke but NOT @skip
node runner.js --tags "@critical and @smoke and not @skip"
```

## Writing Tests

### Feature File Example

```gherkin
@login @single
Feature: User Login
  As a user
  I want to log in to the application
  So that I can access protected features

  Scenario: Successful login
    Given user is on the login page
    When user enters username "testuser"
    And user enters password "password123"
    And user clicks login button
    Then user should be logged in

@parallel
Scenario: Failed login with invalid credentials
  Given user is on the login page
  When user enters username "invalid"
  And user enters password "wrong"
  And user clicks login button
  Then error message should display
```

### Step Definition Example

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('user is on the login page', async function () {
  await this.page.goto('/login');
});

When('user enters username {string}', async function (username) {
  await this.page.fill('input[name="username"]', username);
});

Then('user should be logged in', async function () {
  await expect(this.page).toHaveURL('/dashboard');
});
```

## Test Tags

Use tags to organize and filter tests:

- **`@single`** - Tests that should run sequentially (slower/resource-intensive tests)
- **`@parallel`** - Tests that can safely run in parallel
- **`@smoke`** - Quick smoke tests
- **`@critical`** - Critical functionality tests
- **`@login`** - Login-related tests

## Reports

After test execution:

- **HTML Report**: `reports/cucumber.html` - Open in browser to view detailed results with pass/fail summary
- **Screenshots**: `reports/screenshots/` - Automatic screenshots from failed steps
- **Embedded Screenshots**: Failure screenshots and error messages are embedded in the HTML report
- **Smart Report Merging**: The system automatically detects and uses the most complete test results when multiple JSON files exist (prioritizes larger files with actual test data)

### Viewing Reports

```bash
# Open HTML report in default browser (macOS)
open reports/cucumber.html

# Open HTML report on Linux
xdg-open reports/cucumber.html

# Open HTML report on Windows
start reports\cucumber.html

# Or simply open the file directly in your browser
```

## Debugging

### View Current Configuration

```bash
node runner.js --help
```

### Run Single Test

```bash
node runner.js --tags @login --single
```

### Run with Headed Mode (see browser actions)

Ensure `HEADLESS=false` in `.env`, then run tests normally.

### Increase Timeouts for Slow Tests

Update `.env`:
```properties
WAIT_MS=10000
NAVIGATION_TIMEOUT_MS=60000
```

### Error Capture and Screenshots

When a step fails, the system automatically:

1. **Captures Error Message**: Logs the failure reason with full stack trace (via `afterStep.ts`)
2. **Takes Screenshot**: Creates a PNG screenshot at the moment of failure
3. **Embeds in Report**: Error message and screenshot appear in the HTML report with step name

This happens for each failed step, allowing you to:
- See exactly what the browser state was when failure occurred
- Read the complete error message without running tests again
- Correlate errors with visual failures

The feature is implemented in `src/hooks/afterStep.ts` and runs after each step, checking for failures.

## Troubleshooting

### Tests timeout frequently
- Increase `WAIT_MS` and `NAVIGATION_TIMEOUT_MS` in `.env`
- Reduce `PARALLEL` workers if system is overloaded

### Screenshots not captured
- Ensure `reports/` directory exists
- Check that failed steps are properly detected
- Verify the `afterStep.ts` hook is running (should see screenshot console messages)

### HTML report is empty
- Check that test JSON files have actual content (not just `[]`)
- Verify `generateFallbackHtmlReport()` is using the correct (largest) JSON file
- Ensure tests are generating data before report generation is attempted
- Use `npm run clean` to remove old reports and regenerate

### Parallel tests fail but sequential work fine
- Add `@single` tag to problematic tests
- Reduce `PARALLEL` workers
- Check for race conditions or shared state between tests

## Performance Tips

1. **Use Parallel Execution**: Set `PARALLEL=4` for faster test runs
2. **Optimize Selectors**: Use specific, fast selectors in page objects
3. **Use Mobile Device**: Mobile tests may be slower; run on separate suite
4. **Tag Tests Properly**: Use `@single` for flaky/dependent tests only
5. **Clean Reports**: Runs automatically clean old screenshots

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: HEADLESS=true node runner.js
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: reports
          path: reports/
```

## Contributing

1. Create feature files in `src/features/`
2. Implement step definitions in `src/steps/`
3. Create page objects in `src/pages/`
4. Use appropriate tags (`@single` or `@parallel`)
5. Run tests before committing

## License

ISC

## Support

For issues or questions, please check the project structure and configuration before reaching out.

Or with `cross-env` (used in scripts):

```powershell
npx cross-env WAIT_MS=20000 NAVIGATION_TIMEOUT_MS=60000 DEVICE=desktop cucumber-js
```

## How timeouts and navigation work in this project

- `src/config/env.ts` reads the `.env` variables and exposes `ENV.wait` and `ENV.navigationTimeout`.
- `src/config/driver.factory.ts` sets the Playwright `baseURL` on the browser context so page objects can use relative `page.goto('/path')` calls.
- The created `page` has these timeouts applied:
	- `page.setDefaultTimeout(ENV.wait)` — applies to actions and locators
	- `page.setDefaultNavigationTimeout(ENV.navigationTimeout)` — applies to navigation calls
- `src/hooks/before.ts` also raises the Cucumber hook timeout to `ENV.navigationTimeout` to avoid early hook timeouts.

If you experience locator timeouts (e.g., `page.fill` timing out waiting for a selector):

- Verify the `BASE_URL` is correct and that the page you navigate to contains the selector used in the page object.
- Check whether the mobile layout uses different selectors or hides elements.
- Prefer explicit waits in page objects where elements are rendered dynamically, for example:

```ts
await this.page.waitForSelector('[data-testid="email"]', { state: 'visible', timeout: 20000 });
await this.page.fill('[data-testid="email"]', email);
```


## Troubleshooting

- "function timed out, ensure the promise resolves within 5000 milliseconds": increase `NAVIGATION_TIMEOUT_MS` or set Cucumber hook timeout in `src/hooks/before.ts` (already wired to `ENV.navigationTimeout`).
- "Cannot navigate to invalid URL": ensure `BASE_URL` is set and that contexts are created with `baseURL` so `page.goto('/path')` resolves.
- Selector not found: validate selector exists in the rendered DOM for the chosen device (desktop/mobile). Add `waitForSelector` if necessary.

## Contributing

PRs welcome. Keep changes small and run `npm run test:desktop` locally.

---

If you'd like, I can add a short example test or a troubleshooting checklist to the README.
