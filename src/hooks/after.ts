import { After, Status } from '@cucumber/cucumber';
import { takeScreenshot } from '../utils/screenshot';

After(async function (scenario) {
  const status = scenario.result?.status;

  if (this.page && !this.page.isClosed() && status && status !== Status.PASSED) {
    try {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      const name = scenario.pickle?.name || 'scenario';
      const buf = await takeScreenshot(this.page, `scenario-${name.replace(/\s+/g, '-')}-${ts}`);
      await this.attach(buf, 'image/png');
    } catch {}
  }

  if (this.browser) {
    try { await this.browser.close(); } catch {}
  }
});
