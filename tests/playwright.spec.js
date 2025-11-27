const { test, expect } = require('@playwright/test');

test('practise with frames', async ({ page }) => {

  await page.goto("https://demoqa.com/", { viewport: { width: 1920, height: 945 } });

  await page.getByText("Alerts, Frame & Windows", { state: 'visible' }).click();
  await page.waitForURL("https://demoqa.com/alertsWindows");

  await page.getByText("Frames", { state: 'visible' }).first().click();

  // Correct heading locator
  const heading = await page.locator('#framesWrapper h1').textContent();
  console.log(heading);   // Prints "Frames"

  await page.pause();

  const frame1=await page.frameLocator("#frame1");
  const heading1=await frame1.locator("#sampleHeading").textContent();
    console.log(heading1);   // Prints "This is a sample page"

    const frame2=await page.frameLocator('#frame2');
    const heading2=await frame2.locator("#sampleHeading").textContent();
    console.log("Frame2 text:",heading2);   // Prints "This is a sample page"

    await page.getByText("Nested Frames", { state: 'visible' }).click();
    const parentFrame=await page.frameLocator("#frame1");
    const headingParent=await parentFrame.locator("body").textContent();
    console.log("Parent frame text:",headingParent.trim());   // Prints "Parent frame"  
    const childFrameText=await parentFrame.frameLocator("iframe").locator("body").textContent();
    console.log("Child Frame text:",childFrameText.trim());   
});
