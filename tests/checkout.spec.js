const {test,expect}=require('@playwright/test');
const {checkoutPage}=require('../pages/checkout.js');
const { getEnvConfig } = require('../utils/envManager.js');
const{homePage}=require('../pages/home.js')

const env = getEnvConfig();

test.use({ browserName: 'chromium' });

test.describe('Cart and Checkout Test',()=>{
    test('product name verification',async({page})=>{

        const productText="ZARA COAT 3";
        const homePageInstance=new homePage(page);
        await homePageInstance.goto();
        const productName=await homePageInstance.homePageproduct(productText);

        const checkoutpage=new checkoutPage(page);
        await checkoutpage.goToCart();
        const name=await checkoutpage.CartPage();
        console.log("name of the product in cart:",name);   
        expect(name.includes(productName)).toBeTruthy();
        

    });
}); 