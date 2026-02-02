import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function takeScreenshot(page: Page, testName: string): Promise<Buffer> {
  const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
  
  try {
    // Create screenshots directory if it doesn't exist - do this first!
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
      console.log(`📁 Created screenshots directory: ${screenshotsDir}`);
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${testName}-${timestamp}.png`;
    const filepath = path.join(screenshotsDir, filename);

    // Take screenshot with timeout - don't wait for all resources
    console.log(`📸 Taking screenshot...`);
    const buffer = await page.screenshot({ 
      timeout: 3000  // 3 second timeout for screenshot
    });
    
    // Save buffer to file
    fs.writeFileSync(filepath, buffer);
    console.log(`✅ Screenshot saved: ${filepath}`);
    return buffer;
  } catch (error) {
    console.error('❌ Error taking screenshot:', error);
    // Still return a buffer for attach call
    return Buffer.from([]);
  }
}


