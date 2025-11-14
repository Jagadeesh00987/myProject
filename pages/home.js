const{test,expect}=require('playwright/test')
const {homeSelectors}=require('../selectors/home.js');

class homePage{

constructor(page){
    this.page=page;
}
async goto(){
await this.page.goto('#/dashboard/dash');

}

async homePageIcon(text){
await this.page.locator(homeSelectors.heading).first().isVisible();
await this.page.locator(homeSelectors.filters).last().fill(text);
await this.page.press(homeSelectors.filters, 'Enter');
await this.page
  .locator(homeSelectors.product)
  .filter({ hasText: 'ZARA COAT 3' })
  .locator('button:has-text("Add To Cart")')
  .click();

}
async homePageproduct(text){
await this.page.locator(homeSelectors.heading).first().isVisible();
await this.page.locator(homeSelectors.filters).last().fill(text);
await this.page.press(homeSelectors.filters, 'Enter');
await this.page
  .locator(homeSelectors.product)
  .filter({ hasText: 'ZARA COAT 3' })
  .locator('button:has-text("Add To Cart")')
  .click();
const productName=await this.page
  .locator(homeSelectors.product)
  .filter({ hasText: 'ZARA COAT 3' }).textContent();
return productName; 

}

}


module.exports={homePage};