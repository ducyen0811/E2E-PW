const path = require('path');
require('dotenv').config();

// Don't set parallel here - let CLI handle it for proper JSON report generation
module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: [
      'src/steps/**/*.ts',
      'src/hooks/**/*.ts',
      'src/world/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'json:reports/json/cucumber-report.json',
      'html:reports/html/cucumber-report.html',
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      colorsEnabled: true
    },
    dryRun: false,
    failFast: false,
    order: 'random',
    strict: true
  }
};