import { ApiClient } from "@/services/ApiClient";
import { Logger } from "@/utils/logger";

export class ViewCountDisplay {
  private outputElementId: string;
  private apiClient: ApiClient;
  private logger: Logger;

  constructor(outputElementId: string, apiClient: ApiClient, logger: Logger) {
    this.outputElementId = outputElementId;
    this.apiClient = apiClient;
    this.logger = logger;
  }

  async display(projectName: string) {
    const element = document.getElementById(this.outputElementId);

    if (!element) {
      this.logger.warn(
        `Output element with ID "${this.outputElementId}" not found`,
      );
      return;
    }

    try {
      const count = await this.apiClient.getViewCount(projectName);
      element.innerHTML = count.toString();
    } catch {
      this.logger.warn(
        `Failed to load count value in '${this.outputElementId}'. Refresh the page!`,
      );
    }
  }
}
