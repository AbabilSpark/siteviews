import slugify from "slugify";
import { SiteViewsConfig } from "@/types";
import { DOC_SOURCE } from "@/constants";
import * as utils from "@/utils";

export class ConfigParser {
  private scriptElement: Element | null;
  private logger: utils.Logger;

  constructor() {
    this.scriptElement = document.querySelector(
      "script[scriptfor='siteviews']",
    );
    this.logger = new utils.Logger(this.getSuppressLogs());
  }

  parse(): SiteViewsConfig | null {
    if (!this.validateScriptElement()) return null;

    const projectName = this.getProjectName();
    const outputElementId = this.getOutputElementId();

    if (!outputElementId) return null;

    const refreshInterval = this.getRefreshInterval();
    const showToast = this.getShowToast();
    const suppressLogs = this.getSuppressLogs();

    if (!this.validateOutputElement(outputElementId)) return null;

    return {
      projectName,
      outputElementId,
      refreshInterval,
      showToast,
      suppressLogs,
    };
  }

  private validateScriptElement(): boolean {
    if (!this.scriptElement) {
      this.logger.error(
        `Please add the "scriptfor" attribute with the value "siteviews" to your script tag. Read the documentation: ${DOC_SOURCE}`,
      );
      return false;
    }
    return true;
  }

  private getProjectName(): string {
    const rawName = this.scriptElement!.getAttribute("project-name");

    if (!rawName) {
      this.logger.warn(
        `Please provide a project name using the attribute 'project-name="your-project-name"'. Read the documentation: ${DOC_SOURCE}`,
      );
    }

    const validatedName = utils.validateProjectName(rawName || "");
    return slugify(validatedName);
  }

  private getOutputElementId(): string | null {
    const elementId = this.scriptElement!.getAttribute("output-element-id");

    if (!elementId) {
      this.logger.error(
        `Please provide a valid 'output-element-id' that matches an existing HTML element.`,
      );
      return null;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(elementId)) {
      this.logger.error(
        `Output element ID must be alphanumeric (letters, numbers, hyphens, underscores only). Got: "${elementId}"`,
      );
      return null;
    }

    return elementId;
  }

  private validateOutputElement(elementId: string): boolean {
    const element = document.getElementById(elementId);

    if (!element) {
      this.logger.error(
        `The provided output-element-id: "${elementId}" was not found in the HTML. Make sure the ID is correctly used in your markup.`,
      );
      return false;
    }
    return true;
  }

  private getRefreshInterval(): number | undefined {
    const refresh = this.scriptElement!.getAttribute("refresh");

    if (!refresh) {
      return undefined;
    }

    const interval = parseInt(refresh, 10);
    const validated = utils.validateRefreshInterval(interval);

    if (!validated && interval < 10) {
      this.logger.warn(
        `You've set a refresh value less than 10, which is not allowed. The minimum acceptable refresh value is 10.`,
      );
      return utils.validateRefreshInterval(10);
    }

    return validated;
  }

  private getShowToast(): boolean {
    return this.scriptElement!.hasAttribute("toast");
  }

  private getSuppressLogs(): boolean {
    return this.scriptElement!.hasAttribute("suppressLogs");
  }
}
