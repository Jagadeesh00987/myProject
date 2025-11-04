import { test as base, expect } from '@playwright/test';
import { logger } from './logger.js';

// ✅ Extend Playwright with custom context + page
export const test = base.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'state/state.json'
    });
    await context.tracing.start({ screenshots: true, snapshots: true });
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
});

// ✅ BEFORE ALL TESTS
base.beforeAll(async () => {
  logger.info("🚀 Test Suite Execution Started");
});

// ✅ BEFORE EACH TEST
test.beforeEach(async ({ page }, testInfo) => {
  logger.info(`🔵 Test Started: ${testInfo.title}`);
});

// ✅ AFTER EACH TEST
test.afterEach(async ({ page, context }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    logger.error(`🔴 Test Failed: ${testInfo.title}`);

    // 📸 Screenshot on failure
    await page.screenshot({
      path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`,
      fullPage: true,
    });

    // 📦 Save Playwright trace
    const tracePath = `traces/${testInfo.title.replace(/\s+/g, '_')}.zip`;

    await context.tracing.stop({
      path: tracePath
    });

    await testInfo.attach("trace", {
      path: tracePath,
      contentType: "application/zip",
    });
  } else {
    logger.info(`✅ Test Passed: ${testInfo.title}`);
  }
});

// ✅ AFTER ALL TESTS
base.afterAll(async () => {
  logger.info("🏁 Test Suite Execution Finished");
});
