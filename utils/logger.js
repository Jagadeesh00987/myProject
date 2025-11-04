import fs from 'fs';
import path from 'path';

class Logger {
  constructor() {
    this.logFile = path.join("logs", `log-${this.getDate()}.log`);

    // Create logs folder if not present
    if (!fs.existsSync("logs")) {
      fs.mkdirSync("logs");
    }
  }

  getDate() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  getTime() {
    return new Date().toISOString();
  }

  write(level, message) {
    const logMsg = `[${this.getTime()}] [${level}] ${message}\n`;
    fs.appendFileSync(this.logFile, logMsg);
    console.log(logMsg.trim());
  }

  info(msg) {
    this.write("INFO", msg);
  }

  error(msg) {
    this.write("ERROR", msg);
  }

  warn(msg) {
    this.write("WARN", msg);
  }
}

export const logger = new Logger();
