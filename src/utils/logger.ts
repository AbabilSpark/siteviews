export class Logger {
  private suppressLogs: boolean;
  private prefix: string = "[SiteViews]";

  constructor(suppressLogs: boolean = false) {
    this.suppressLogs = suppressLogs;
  }

  info(message: string, ...args: any[]) {
    if (!this.suppressLogs) {
      console.log(`${this.prefix} ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (!this.suppressLogs) {
      console.warn(`${this.prefix} ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (!this.suppressLogs) {
      console.error(`${this.prefix} ${message}`, ...args);
    }
  }
}
