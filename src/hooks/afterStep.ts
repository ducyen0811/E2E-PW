import { AfterStep, Status } from '@cucumber/cucumber';
import { takeScreenshot } from '../utils/screenshot';

AfterStep(async function (step) {
  if (!this.page || this.page.isClosed()) return;

  if (step.result?.status === Status.FAILED) {
    try {
      const stepText = step.pickleStep?.text || 'failed-step';
      const errorMessage = step.result?.message || 'Unknown error';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      console.log(`📸 Step failed: "${stepText}"`);

      // Attach error text
      await this.attach(
        `❌ FAILURE REASON:\n${errorMessage}`,
        'text/plain'
      );

      // Take & attach screenshot
      const screenshotBuffer = await takeScreenshot(
        this.page,
        `failed-${stepText.replace(/\s+/g, '-').substring(0, 40)}-${timestamp}`
      );

      await this.attach(screenshotBuffer, 'image/png');

      console.log('✅ Failure details attached');
    } catch (err) {
      console.error('❌ Failed to attach failure info:', err);
    }
  }
});
