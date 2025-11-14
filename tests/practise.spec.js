const{test,expect}=require('@playwright/test');

test("Page",async({page})=>{

await page.goto("https://www.redbus.in/")
//await expect(page).toHaveTitle(/RedBus/);
await page.waitForLoadState('networkidle');
await page.locator("div[class*='labelCityWrapper___fd5744'] >> text=From").first().click();
await page.getByRole('textbox', { name: 'From' }).fill('Chennai');
await page.waitForTimeout(5000);
const suggestions=await page.locator("div[class='leftContent___42c26c'] >> role=heading").first();;
const listOfNames= await suggestions.allTextContents();
console.log(listOfNames);

for(let name of listOfNames){
if(name.includes("Chennai")){

    await page.locator("div[class='leftContent___42c26c'] >> role=heading", { hasText: "Chennai" }).click();
    break;  
}
await page.pause();

}

})