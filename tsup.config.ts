import { defineConfig } from "tsup";
import fs from "fs";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["iife"],
    outExtension: () => ({ js: ".js" }),
    minify: true,
    treeshake: true,
    globalName: "SiteViews",
    banner: {
      js: fs.readFileSync("./banner.ts", "utf-8"),
    },
  },
]);
