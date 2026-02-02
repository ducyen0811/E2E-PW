import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  baseUrl: process.env.BASE_URL!,
  headless: process.env.HEADLESS === 'true',
  device: process.env.DEVICE || 'desktop',
  // default timeout for actions / locators (ms)
  wait: process.env.WAIT_MS ? parseInt(process.env.WAIT_MS, 10) : 5000,
  // default navigation timeout (ms)
  navigationTimeout: process.env.NAVIGATION_TIMEOUT_MS ? parseInt(process.env.NAVIGATION_TIMEOUT_MS, 10) : 30000,
  // parallel workers
  parallel: process.env.PARALLEL ? parseInt(process.env.PARALLEL, 10) : 2
};