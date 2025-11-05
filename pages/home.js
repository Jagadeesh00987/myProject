const{test,expect}=require('playwright/test')
const {homeSelectors}=require('../selectors/home.js');

class homePage{

constructor(page){
    this.page=page;
}
async goto(){
await this.page.goto('#/dashboard/dash');

}

async homePageIcon(){
await this.page.locator(homeSelectors.homeIcon).nth(0).isVisible();
await this.page.locator(homeSelectors.signOut).nth(0) .isVisible();

}

}
module.exports={homePage};