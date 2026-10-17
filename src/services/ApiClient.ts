import { ApiResponse, VisitData } from "@/types";
import { API_ENDPOINTS } from "@/constants";
import { Logger } from "@/utils/logger";

export class ApiClient {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async sendVisitData(data: VisitData): Promise<boolean> {
    try {
      const response = await fetch(API_ENDPOINTS.COUNT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.status === 200 || response.status === 201) {
        return true;
      }

      const result = await response.json();
      this.logger.warn(result?.message || "Failed to send visit data");
      return false;
    } catch {
      this.logger.warn("Failed to interact with SiteViews API");
      return false;
    }
  }

  async getViewCount(projectName: string): Promise<number> {
    try {
      const response = await fetch(`${API_ENDPOINTS.COUNT}/${projectName}`, {
        method: "GET",
      });

      if (!response.ok) {
        return 0;
      }

      const result: ApiResponse<{ count: number }> = await response.json();
      return result.data?.count || 0;
    } catch {
      return 0;
    }
  }
}
