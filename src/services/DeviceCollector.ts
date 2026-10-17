import { DeviceInfo } from "@/types";

export class DeviceCollector {
  collect(): DeviceInfo {
    return {
      userDateTime: new Date().toLocaleString(),
      platform: navigator.platform,
      version: navigator.appVersion,
      screenWidth: screen.width,
      screenHeight: screen.height,
    };
  }
}
