import fs from "fs";
import path from "path";

export function loadEnv(envName = "dev") {
  try {
    const envPath = path.resolve(`./env/${envName}.json`);

    if (!fs.existsSync(envPath)) {
      throw new Error(`❌ Environment file not found: ${envPath}`);
    }

    const rawData = fs.readFileSync(envPath);
    const parsed = JSON.parse(rawData);

    return parsed;
  } catch (error) {
    console.error(`❌ Failed to load environment: ${envName}`);
    console.error(error.message);
    process.exit(1);
  }
}
