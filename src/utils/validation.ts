import { DEFAULTS } from "@/constants";

export const validateRefreshInterval = (
  interval: number | null,
): number | undefined => {
  if (interval === null) {
    return undefined;
  }

  if (isNaN(interval)) return;

  if (interval < 10) {
    return DEFAULTS.MIN_REFRESH_INTERVAL;
  }

  return interval * 1000;
};

export const validateProjectName = (projectName: string) => {
  return !projectName || projectName.trim() === ""
    ? DEFAULTS.FALLBACK_PROJECT_NAME
    : projectName;
};
