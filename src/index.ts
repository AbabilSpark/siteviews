import { ConfigParser } from "@/core/ConfigParser";
import { SiteViewsClient } from "@/core/SiteViewsClient";

const cf = new ConfigParser();
const config = cf.parse();

if (config) {
  const client = new SiteViewsClient(config);
  client.initialize();
}
