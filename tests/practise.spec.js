const{test,expect}=require('@playwright/test');

test("Page",async({page})=>{

await page.goto("https://www.redbus.in/")
//await expect(page).toHaveTitle(/RedBus/);
await page.waitForLoadState('domcontentloaded');
 await page.locator("div[class*='labelCityWrapper___fd5744'] >> text=From").first().click();
// await page.getByRole('textbox', { name: 'From' }).fill('Chennai');
// await page.waitForTimeout(5000);

//const sugg= aria-label='Search suggestions list'

// const suggestions=await page.locator("div[class='listHeader___90a8b7']");
// const listOfNames= await suggestions.allTextContents();
// console.log(listOfNames);

// for(let name of listOfNames){
// if(name.includes("Perungalathur")){

//     await page.locator("[role='heading'] div[class='listHeader___90a8b7']", { hasText: "Perungalathur" }).click();
//     break;  
// }

//class="srcDest___aa6db3"

//class="searchCategory___993266"
//}
// await page.pause();
// Type into FROM field
await page.getByRole('textbox', { name: 'From' }).fill('Chennai');

// Wait for suggestion list to appear
const suggestions = page.locator("div[class='searchCategory___993266']").locator(".leftListCont___9ce83f").locator(".listHeader___90a8b7");

// Get suggestion count`
const count = await suggestions.count();

console.log("Suggestions found:", count);

// Iterate all suggestions
for (let i = 0; i < count; i++) {
  const text = await suggestions.nth(i).innerText();

  console.log("Suggestion:", text);

  if (text.includes("")) {
    await suggestions.nth(i).click();
    console.log("Clicked:", text);
    break;
  }
}
await page.pause();
})