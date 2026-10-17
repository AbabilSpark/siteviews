import { STORAGE_KEYS } from "@/constants";
import { getFromSessionStorage, setInSessionStorage } from "@/utils/storage";

export class VisitTracker {
  private hostname: string;
  private storageKey: string;

  constructor() {
    this.hostname = location.hostname;
    this.storageKey = `${STORAGE_KEYS.VISIT_PREFIX}${this.hostname}`;
  }

  hasVisited(): boolean {
    const value = getFromSessionStorage(this.storageKey);
    return value === this.hostname;
  }

  markAsVisited() {
    setInSessionStorage(this.storageKey, this.hostname);
  }
}
