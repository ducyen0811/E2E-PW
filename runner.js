#!/usr/bin/env node

const { spawn } = require('child_process');
require('dotenv').config();

// Parse command line arguments
const args = process.argv.slice(2);

// Read settings from .env
let tags = '';
let device = process.env.DEVICE || 'desktop';
let parallel = process.env.PARALLEL || 2;
let headless = process.env.HEADLESS === 'true';
let ordered = false;

// Help message
const helpMessage = `
Usage: npm run runner [options]

Runs tests using settings configured in .env file

Options:
  --tags <tags>           Cucumber tags to filter tests (e.g., @login,@smoke)
  --ordered               Run @single first (sequential), then @parallel (default when no tags)
  --device <device>       Override device: desktop, mobile
  --parallel <number>     Override parallel workers
  --single                Run sequentially (parallel=1)
  --headless              Run in headless mode
  --help                  Show this help message

Current .env Settings:
  BASE_URL: ${process.env.BASE_URL}
  DEVICE: ${device}
  PARALLEL: ${parallel}
  HEADLESS: ${headless}
  WAIT_MS: ${process.env.WAIT_MS}
  NAVIGATION_TIMEOUT_MS: ${process.env.NAVIGATION_TIMEOUT_MS}

Examples:
  npm run runner                              (runs @single first, then @parallel)
  npm run runner -- --tags @login
  npm run runner -- --tags @smoke --device mobile
  npm run runner -- --single
  npm run runner -- --ordered --device mobile
  npm run runner -- --help
`;

// Parse arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg === '--help') {
    console.log(helpMessage);
    process.exit(0);
  } else if (arg === '--tags' && i + 1 < args.length) {
    tags = args[++i];
  } else if (arg === '--device' && i + 1 < args.length) {
    device = args[++i];
  } else if (arg === '--parallel' && i + 1 < args.length) {
    parallel = args[++i];
  } else if (arg === '--single') {
    parallel = 1;
  } else if (arg === '--ordered') {
    ordered = true;
  } else if (arg === '--headless') {
    headless = true;
  }
}

// If no tags specified, use ordered mode by default
if (!tags) {
  ordered = true;
}

// Validate device
if (!['desktop', 'mobile'].includes(device)) {
  console.error(`Error: Invalid device "${device}". Must be "desktop" or "mobile"`);
  process.exit(1);
}

// Build environment variables
const env = {
  ...process.env,
  DEVICE: device,
  HEADLESS: headless.toString()
};

// Function to run tests
function runTests(testTags, parallelWorkers, mode) {
  return new Promise((resolve) => {
    const fs = require('fs');
    const path = require('path');
    
    env.PARALLEL = parallelWorkers;
    
    // Generate unique report file name based on timestamp to avoid conflicts
    const timestamp = Date.now();
    const reportFileName = `cucumber-report-${timestamp}.json`;
    
    // Build Cucumber command with proper flags
    let cucumberCmd = `npx cucumber-js --format progress --format json:reports/json/${reportFileName}`;
    
    // Add parallel flag if more than 1 worker
    if (parallelWorkers > 1) {
      cucumberCmd += ` --parallel ${parallelWorkers}`;
    }
    
    if (testTags) {
      cucumberCmd += ` --tags "${testTags}"`;
    }

    console.log(`\n${'='.repeat(70)}`);
    console.log(`🚀 Running ${mode}: ${testTags || 'all tests'}`);
    console.log(`   Parallel Workers: ${parallelWorkers}`);
    console.log(`${'='.repeat(70)}\n`);

    const shell = process.platform === 'win32' ? 'cmd' : '/bin/bash';
    const shellArgs = process.platform === 'win32' ? ['/c', cucumberCmd] : ['-c', cucumberCmd];

    const runner = spawn(shell, shellArgs, {
      cwd: process.cwd(),
      env: env,
      stdio: 'inherit'
    });

    runner.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${mode} completed successfully!\n`);
      } else {
        console.log(`\n❌ ${mode} failed with exit code ${code}\n`);
      }
      resolve(code);
    });

    runner.on('error', (error) => {
      console.error(`Error running ${mode}:`, error);
      resolve(1);
    });
  });
}

// Function to generate HTML report from NDJSON
function generateHtmlReport() {
  return new Promise((resolve) => {
    const fs = require('fs');
    const path = require('path');

    try {
      // Try to use the CLI tool if available
      const reportGenerator = spawn('npx', ['cucumber-html-reporter', '-e', 'reports', '-o', 'reports/cucumber.html', '-f', 'reports/json/cucumber-report.json'], {
        cwd: process.cwd(),
        stdio: 'inherit'
      });

      reportGenerator.on('close', (code) => {
        if (code === 0) {
          console.log('✅ HTML report generated successfully');
        } else {
          console.warn('⚠️ HTML report generation had issues, but continuing...');
        }
        resolve();
      });

      reportGenerator.on('error', (error) => {
        console.warn('⚠️ Could not generate HTML report via CLI:', error.message);
        // Try fallback: simple HTML report
        generateFallbackHtmlReport();
        resolve();
      });
    } catch (e) {
      console.warn('⚠️ Report generation failed:', e.message);
      generateFallbackHtmlReport();
      resolve();
    }
  });
}

// Fallback: Generate a simple HTML report from JSON
function generateFallbackHtmlReport() {
  try {
    const fs = require('fs');
    const path = require('path');
    const reportsDir = path.join(process.cwd(), 'reports');
    
    if (!fs.existsSync(reportsDir)) {
      console.log('📄 No reports directory found');
      return;
    }

    // Merge all cucumber-report-*.json files
    let allResults = [];
    const files = fs.readdirSync(reportsDir);
    const reportFiles = files
      .filter(f => f.match(/^cucumber-report-\d+\.json$/))
      .sort()
      .reverse(); // Latest first

    for (const file of reportFiles) {
      const filePath = path.join(reportsDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          allResults.push(...parsed);
        }
      } catch (e) {
        console.warn(`Could not parse ${file}: ${e.message}`);
      }
    }

    // Also check for the main report file (for backwards compatibility)
    const mainReportPath = path.join(reportsDir, 'cucumber-report.json');
    if (fs.existsSync(mainReportPath)) {
      try {
        const content = fs.readFileSync(mainReportPath, 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allResults = parsed; // Use main report if it has data
        }
      } catch (e) {
        console.warn(`Could not parse main report: ${e.message}`);
      }
    }

    const results = allResults;
    if (!Array.isArray(results) || results.length === 0) {
      console.log('📄 No test results found');
      return;
    }

    let passedCount = 0;
    let failedCount = 0;
    let html = `<!DOCTYPE html>
<html>
<head>
  <title>Cucumber Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1000px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px; }
    .summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 20px 0; }
    .stat { padding: 15px; border-radius: 4px; text-align: center; }
    .stat.passed { background: #d4edda; color: #155724; }
    .stat.failed { background: #f8d7da; color: #721c24; }
      @@    // Merge all cucumber-report-*.json files
    .stat.total { background: #e2e3e5; color: #383d41; }
    .stat h3 { margin: 0; font-size: 24px; }
    .stat p { margin: 5px 0 0 0; font-size: 12px; }
    .results { margin-top: 30px; }
    .feature { margin: 20px 0; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
    .feature-header { background: #f5f5f5; padding: 12px 15px; font-weight: bold; border-bottom: 1px solid #ddd; }
    .feature-body { padding: 10px 0; }
    .scenario { border-left: 4px solid #666; padding: 10px 15px; margin: 5px 0; background: #fafafa; }
    .scenario.passed { border-left-color: #28a745; background: #f1f8f4; }
    .scenario.failed { border-left-color: #dc3545; background: #fdf4f5; }
    .scenario h4 { margin: 0 0 5px 0; font-size: 14px; }
    .scenario .status { font-weight: bold; font-size: 12px; padding: 2px 6px; border-radius: 3px; display: inline-block; }
    .scenario .status.passed { background: #28a745; color: white; }
    .scenario .status.failed { background: #dc3545; color: white; }
    .step { font-size: 13px; padding: 5px 0; margin-left: 10px; }
    .step.passed { color: #28a745; }
    .step.failed { color: #dc3545; }
    .error { color: #dc3545; font-family: monospace; font-size: 11px; margin-top: 5px; padding: 8px; background: white; border-radius: 3px; border-left: 3px solid #dc3545; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧪 Cucumber Test Report</h1>`;

    // Parse scenarios from JSON
    for (const feature of results) {
      if (!feature.elements) continue;
      
      for (const scenario of feature.elements) {
        const hasFailedStep = scenario.steps && scenario.steps.some(s => s.result && s.result.status === 'failed');
        const status = hasFailedStep ? 'failed' : 'passed';
        
        if (status === 'passed') passedCount++;
        else failedCount++;
      }
    }

    html += `
    <div class="summary">
      <div class="stat passed">
        <h3>${passedCount}</h3>
        <p>Passed</p>
      </div>
      <div class="stat failed">
        <h3>${failedCount}</h3>
        <p>Failed</p>
      </div>
      <div class="stat total">
        <h3>${passedCount + failedCount}</h3>
        <p>Total</p>
      </div>
    </div>
    <div class="results">
      <h2>Scenarios</h2>`;

    // Add detailed results
    for (const feature of results) {
      if (!feature.elements || feature.elements.length === 0) continue;
      
      html += `<div class="feature">
        <div class="feature-header">${feature.name || 'Unnamed Feature'}</div>
        <div class="feature-body">`;

      for (const scenario of feature.elements) {
        const hasFailedStep = scenario.steps && scenario.steps.some(s => s.result && s.result.status === 'failed');
        const status = hasFailedStep ? 'failed' : 'passed';
        
        html += `<div class="scenario ${status}">
          <h4>${scenario.name || 'Unnamed Scenario'}</h4>
          <span class="status ${status}">${status.toUpperCase()}</span>`;

        if (scenario.steps) {
          for (const step of scenario.steps) {
            const stepStatus = step.result ? step.result.status : 'unknown';
            html += `<div class="step ${stepStatus}">
              ${step.keyword}${step.name}
            </div>`;

            if (stepStatus === 'failed' && step.result && step.result.message) {
              html += `<div class="error"><strong>Error:</strong><br>${step.result.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
            }
          }
        }

        html += `</div>`;
      }

      html += `</div></div>`;
    }

    html += `
    </div>
  </div>
</body>
</html>`;

    const htmlPath = path.join(process.cwd(), 'reports', 'cucumber.html');
    fs.writeFileSync(htmlPath, html);
    console.log('✅ HTML report generated at reports/cucumber.html');
  } catch (e) {
    console.error('❌ Could not generate fallback report:', e.message);
  }
}

// Execute tests
async function executeTests() {
  const fs = require('fs');
  const path = require('path');
  
  // Clean screenshots ONLY ONCE at the start
  const shellCmd = process.platform === 'win32' ? 'cmd' : '/bin/bash';
  const shellArgs = process.platform === 'win32' ? ['/c', 'npm run clean'] : ['-c', 'npm run clean'];
  
  console.log('\n🧹 Cleaning old artifacts...');
  await new Promise((resolve) => {
    const cleaner = spawn(shellCmd, shellArgs, {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    cleaner.on('close', resolve);
  });
  
  // Clear old report files at the start (before any tests run)
  const reportsDir = path.join(process.cwd(), 'reports');
  try {
    if (fs.existsSync(reportsDir)) {
      const files = fs.readdirSync(reportsDir);
      for (const file of files) {
        if (file.match(/^cucumber-report-\d+\.json$/)) {
          fs.unlinkSync(path.join(reportsDir, file));
        }
      }
    }
  } catch (e) {
    console.warn('Could not clear old reports:', e.message);
  }
  
  console.log('\n📋 Test Execution Configuration:');
  console.log(`  Device: ${device}`);
  console.log(`  Parallel Workers: ${parallel}`);
  console.log(`  Headless: ${headless}`);
  console.log(`  Base URL: ${process.env.BASE_URL}`);
  console.log(`  Wait Timeout: ${process.env.WAIT_MS}ms`);
  console.log(`  Navigation Timeout: ${process.env.NAVIGATION_TIMEOUT_MS}ms`);
  
  if (ordered) {
    console.log(`  Mode: Ordered (@single first, then @parallel)`);
    
    // Run @single tests first (sequential)
    const singleCode = await runTests('@single', 1, '@single Tests (Sequential)');
    
    if (singleCode !== 0) {
      console.log('\n⚠️  @single tests failed, but continuing with @parallel tests...\n');
    }

    // Run @parallel tests (excluding @single) - NO CLEAN between runs
    const parallelCode = await runTests('@parallel and not @single', parallel, '@parallel Tests (Parallel)');
    
    // Generate HTML report
    console.log('\n📊 Generating HTML report...');
    await generateHtmlReport();
    
    console.log('\n' + '='.repeat(70));
    console.log('📊 Final Summary:');
    console.log(`  @single tests: ${singleCode === 0 ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`  @parallel tests: ${parallelCode === 0 ? '✅ PASSED' : '❌ FAILED'}`);
    console.log('='.repeat(70) + '\n');
    console.log('📋 Reports generated:');
    console.log('  - HTML Report: reports/cucumber.html');
    console.log('  - Screenshots: reports/screenshots/');
    console.log('');
    
    process.exit(singleCode !== 0 || parallelCode !== 0 ? 1 : 0);
  } else if (tags) {
    console.log(`  Tags: ${tags}`);
    const code = await runTests(tags, parallel, 'Tests with tags');
    
    // Generate HTML report
    console.log('\n📊 Generating HTML report...');
    await generateHtmlReport();
    
    console.log('\n📋 Reports generated:');
    console.log('  - HTML Report: reports/cucumber.html');
    console.log('  - Screenshots: reports/screenshots/');
    console.log('');
    
    process.exit(code);
  } else {
    // Default: run all tests
    const code = await runTests('', parallel, 'All Tests');
    
    // Generate HTML report
    console.log('\n📊 Generating HTML report...');
    await generateHtmlReport();
    
    console.log('\n📋 Reports generated:');
    console.log('  - HTML Report: reports/cucumber.html');
    console.log('  - Screenshots: reports/screenshots/');
    console.log('');
    
    process.exit(code);
  }
}

executeTests();
