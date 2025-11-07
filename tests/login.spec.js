const{test,expect}=require('playwright/test');
const{LoginPage}=require('../pages/login.js');
const { getEnvConfig } = require('../utils/envManager.js');
const loginTestData = JSON.parse(JSON.stringify(require('../Test-Data/loginTestData.json')));
const logindata = JSON.parse(JSON.stringify(require('../Test-Data/logindata.json')));

const env = getEnvConfig();


test.use({
    browserName: 'chromium',
    storageState: null
});
test.describe('Login Test',()=>{
    test.beforeEach(async({page})=>{
        const loginPage=new LoginPage(page);
        await loginPage.navigate(env.baseUrl);
    });
    
    test('Valid Login',async({page,context})=>{
        const loginPage=new LoginPage(page);
        // navigation already handled in beforeEach
        await loginPage.login(loginTestData.username, loginTestData.password);
        // Add your assertions here
        await loginPage.saveAuthState(context);
    });

for (let data of logindata) {
  test(`Invalid Login Test - ${data.testCase || data.username || 'MissingName'}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.username, data.password);
  });
}


});