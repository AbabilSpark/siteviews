export interface SiteViewsConfig {
  projectName: string;
  outputElementId: string;
  refreshInterval?: number;
  showToast: boolean;
  suppressLogs: boolean;
}

export interface DeviceInfo {
  userDateTime: string;
  platform: string;
  version: string;
  screenWidth: number;
  screenHeight: number;
}

export interface GeoIpInfo {
  ip?: string;
  isp?: string;
  latitude?: number;
  longitude?: number;
  continent_name?: string;
  country_code?: string;
  country_name?: string;
  region?: string;
  city?: string;
  language_name?: string;
  timezone_name?: string;
  [key: string]: any;
}

export interface VisitData extends Partial<DeviceInfo>, Partial<GeoIpInfo> {
  project: string;
  hostname: string;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}
