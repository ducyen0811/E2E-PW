const reporter = require("cucumber-html-reporter");
const path = require("path");
const fs = require("fs");

const jsonDir = path.resolve("reports/json");
const outputDir = path.resolve("reports/html");

// ensure output dir exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

reporter.generate({
  theme: "bootstrap",
  jsonDir: jsonDir,                         // 👈 folder with ALL cucumber json
  output: path.join(outputDir, "index.html"),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  ignoreBadJsonFile: true,
  customCss: path.resolve("custom.css"),               // 👈 important (empty files)
  metadata: {
    "Framework": "Playwright + Cucumber",
    "Platform": process.platform,
    "Node Version": process.version,
    "Execution": "Automation"
  }
});

console.log("✅ Cucumber HTML report generated");
