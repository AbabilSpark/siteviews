import { GeoIpInfo } from "@/types";
import { API_ENDPOINTS } from "@/constants";

export class IpCollector {
  private cachedData: GeoIpInfo | null = null;

  async collect(): Promise<GeoIpInfo> {
    if (this.cachedData) {
      return this.cachedData;
    }

    try {
      const response = await fetch(API_ENDPOINTS.GEO_IP, {
        method: "GET",
      });

      if (!response.ok) {
        return {};
      }

      const data = await response.json();
      const filteredData: GeoIpInfo = {};

      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          filteredData[key] = value;
        }
      });

      this.cachedData = filteredData;
      return filteredData;
    } catch {
      return {};
    }
  }
}
