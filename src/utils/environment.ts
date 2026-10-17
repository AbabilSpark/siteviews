import { LOCAL_HOSTS } from "@/constants";

export function isLocal(): boolean {
  return LOCAL_HOSTS.includes(btoa(location.hostname));
}

export function canTrack(): boolean {
  return !isLocal();
}
