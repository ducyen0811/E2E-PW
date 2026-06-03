import { After, Status } from '@cucumber/cucumber';
import { takeScreenshot } from '../utils/screenshot';
import { deleteDemoQaAccount } from '../utils/demoqa-account';

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

  if (this.account) {
    try { await deleteDemoQaAccount(this.account); } catch {}
  }
});
