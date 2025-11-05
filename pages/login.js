const { test, expect } = require('@playwright/test');
const { login } = require('../selectors/login.js');
// const fs = require('fs');
// const path = require('path');

class LoginPage {
    constructor(page) {
        this.page = page;
    }

  async navigate() {
    await this.page.goto('#/auth/login');
  }
    async login(username, password) {
        await this.page.fill(login.usernameInput, username);
        await this.page.fill(login.passwordInput, password);
        await this.page.click(login.loginButton);
        await this.page.waitForLoadState('networkidle');
    }
   async saveAuthState(context) {
    
 // Create state directory if it doesn't exist
          const fs = require('fs');

    if (!fs.existsSync('state')) {
        fs.mkdirSync('state');
    }
    // ✅ Save session to a file
    await context.storageState({ path: 'state.json' });
}
}

module.exports = { LoginPage };