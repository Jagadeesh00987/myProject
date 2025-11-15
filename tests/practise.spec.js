const{test,expect}=require('@playwright/test');

test("Select dynamic RedBus suggestion", async ({ page }) => {

  await page.goto("https://redbus.in");

  await page.getByRole('button', { name: 'From' }).click();
  await page.getByRole('textbox', { name: 'From' }).fill('chennai');

  // Get all suggestions as array
  const listOfNames = await page.locator("//div[@role='option']").allTextContents();
  console.log(listOfNames);

  // Get locator for selecting elements
  const options = page.locator("//div[@role='option']");
  const total = await options.count();

  for (let i = 0; i < total; i++) {
    const text = await options.nth(i).textContent();

    if (text.includes("Perungalathur")) {
      await options.nth(i).click();
      break;
    }
  }

  await page.getByRole('button', { name: 'To' }).first().click();
  await page.getByRole('textbox', { name: 'To' }).first().fill('vilupuram');

  // Get all suggestions as array
  const listOfNames2 = await page.locator("//div[@role='option']").allTextContents();
  console.log(listOfNames2);

  // Get locator for selecting elements
  const options2 = page.locator("//div[@role='option']");
  const total2 = await options2.count();

  for (let i = 0; i < total2; i++) {
    const text = await options2.nth(i).textContent();

    if (text.includes("vilupuram")) {
      await options2.nth(i).click();
      break;
    }
  } 


await page.pause();

});
