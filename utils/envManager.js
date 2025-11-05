const fs = require('fs');
const path = require('path');

function getEnvConfig() {
    const env = process.env.ENV || 'qa';

    const envFilePath = path.join(__dirname, '..', 'env', `${env}.json`);

    if (!fs.existsSync(envFilePath)) {
        throw new Error(`Environment file not found: ${envFilePath}`);
    }

    return JSON.parse(fs.readFileSync(envFilePath, 'utf-8'));
}

module.exports = { getEnvConfig };
