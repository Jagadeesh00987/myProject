const{test,expect}=require('playwright/test');
const{LoginPage}=require('../pages/login.js');
const { getEnvConfig } = require('../utils/envManager.js');
const loginTestData = JSON.parse(JSON.stringify(require('../utils/loginTestData.json')));

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
});