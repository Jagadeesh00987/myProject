const {test,expect}=require('@playwright/test');
const {homePage}=require('../pages/home.js');
const { getEnvConfig } = require('../utils/envManager.js');
const env = getEnvConfig();



test.use({ browserName: 'chromium' });


test.describe('Home Page Test',()=>{
    test('home Page Icon Verification',async({page})=>{
        
       const productText="ZARA COAT 3";
        const home_Page=new homePage(page);
        await home_Page.goto();
        await home_Page.homePageIcon(productText);
        
    });
}); 