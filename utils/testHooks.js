const { test: base, expect } = require('@playwright/test');
const { logger } = require('./logger.js');

// ✅ Extend Playwright with custom context + page
const test = base.extend({
    context: async ({ browser }, use) => {
        console.log('Creating new browser context'); // Added console log
        const context = await browser.newContext({
            storageState: 'state/state.json'
        });
        await context.tracing.start({ screenshots: true, snapshots: true });
        await use(context);
        await context.close();
    },

    page: async ({ context }, use) => {
        console.log('Creating new page'); // Added console log
        const page = await context.newPage();
        await use(page);
    },
});

// ✅ BEFORE ALL TESTS
test.beforeAll(async () => {
    console.log('\n====== TEST SUITE STARTED ======');
    logger.info("🚀 Test Suite Execution Started");
});

// ✅ BEFORE EACH TEST
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`\n▶️ Running Test: ${testInfo.title}`);
    logger.info(`🔵 Test Started: ${testInfo.title}`);
});

// ✅ AFTER EACH TEST
test.afterEach(async ({ page, context }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        console.log(`❌ Test Failed: ${testInfo.title}`);
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
        console.log(`✅ Test Passed: ${testInfo.title}`);
        logger.info(`✅ Test Passed: ${testInfo.title}`);
    }
});

// ✅ AFTER ALL TESTS
test.afterAll(async () => {
    console.log('\n====== TEST SUITE COMPLETED ======');
    logger.info("🏁 Test Suite Execution Finished");
});

module.exports = { test, expect };
