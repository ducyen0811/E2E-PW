const path = require('path');
require('dotenv').config();

const reportId = process.env.REPORT_ID || Date.now();
const jsonReportDir = process.env.JSON_REPORT_DIR || 'reports/json';
const htmlReportDir = process.env.HTML_REPORT_DIR || 'reports/html';
const format = ['progress'];

if (process.env.NO_REPORT !== 'true') {
  format.push(
    `json:${jsonReportDir}/cucumber-report-${reportId}.json`,
    `html:${htmlReportDir}/cucumber-report-${reportId}.html`
  );
}

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
    format,
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
