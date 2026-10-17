import * as types from "@/types";
import * as utils from "@/utils";
import * as service from "@/services";

export class SiteViewsClient {
  private config: types.SiteViewsConfig;
  private logger: utils.Logger;
  private visitTracker: service.VisitTracker;
  private apiClient: service.ApiClient;
  private viewDisplay: service.ViewCountDisplay;
  private notificationService: service.NotificationService;
  private deviceCollector: service.DeviceCollector;
  private ipCollector: service.IpCollector;
  private refreshIntervalId?: number;

  constructor(config: types.SiteViewsConfig) {
    this.config = config;
    this.logger = new utils.Logger(config.suppressLogs);
    this.visitTracker = new service.VisitTracker();
    this.apiClient = new service.ApiClient(this.logger);
    this.viewDisplay = new service.ViewCountDisplay(
      config.outputElementId,
      this.apiClient,
      this.logger,
    );
    this.notificationService = new service.NotificationService();
    this.deviceCollector = new service.DeviceCollector();
    this.ipCollector = new service.IpCollector();
  }

  async initialize() {
    if (utils.isLocal()) {
      this.logger.warn(
        "To use 'SiteViews', Please Deploy your website at first.",
      );
      this.logger.warn("SiteViews Does not work in Local Development");
      return;
    }

    const hasVisited = this.visitTracker.hasVisited();

    if (!hasVisited) {
      await this.trackVisit();
    }

    await this.displayViewCount();

    if (this.config.refreshInterval) {
      this.setupAutoRefresh();
    }
  }

  private async trackVisit() {
    const deviceInfo = this.deviceCollector.collect();
    const geoInfo = await this.ipCollector.collect();

    const visitData: types.VisitData = {
      project: this.config.projectName,
      hostname: location.hostname,
      ...deviceInfo,
      ...geoInfo,
    };

    const success = await this.apiClient.sendVisitData(visitData);

    if (success) {
      this.visitTracker.markAsVisited();

      if (this.config.showToast) {
        await this.notificationService.show(
          `Welcome to ${this.config.projectName}`,
        );
      }
    }
  }

  private async displayViewCount() {
    await this.viewDisplay.display(this.config.projectName);
  }

  private setupAutoRefresh() {
    if (!this.config.refreshInterval) {
      return;
    }

    this.refreshIntervalId = window.setInterval(() => {
      this.displayViewCount();
    }, this.config.refreshInterval);
  }

  destroy() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  }
}
