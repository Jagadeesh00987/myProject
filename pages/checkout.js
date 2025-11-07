const {test,expect}=require('playwright/test');
const {checkoutSelectors}=require('../selectors/checkout.js');



class checkoutPage{
constructor(page){
this.page=page;

}
async goToCart() {
    await this.page.goto('#/dashboard/cart');
}


async CartPage(){

await this.page.locator(checkoutSelectors.addToCartButton).nth(2).click();
const name=await this.page.locator(checkoutSelectors.name).first().textContent();
return name;

}

}
module.exports={checkoutPage};