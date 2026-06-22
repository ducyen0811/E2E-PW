const fs = require('node:fs');
const path = require('node:path');

const targets = [
  'reports/screenshots',
  'reports/json',
  'reports/html',
  'reports/cucumber.html',
  'test-results'
];

for (const target of targets) {
  const resolved = path.resolve(process.cwd(), target);
  fs.rmSync(resolved, { recursive: true, force: true });
}

console.log('Reports and test results cleaned.');
