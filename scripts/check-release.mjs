import { readFile } from "node:fs/promises";
import config from "../astro-paper.config.ts";

const errors = [];
const url = new URL(config.site.url);
if (
  url.protocol !== "https:" ||
  /(^|\.)(example\.(com|org|net)|localhost|invalid)$/.test(url.hostname) ||
  /^(127\.|0\.)/.test(url.hostname)
) {
  errors.push("Set site.url to the real HTTPS domain before a release build.");
}
if (!errors.length && !process.argv.includes("--config-only")) {
  const html = await readFile(
    new URL("../dist/index.html", import.meta.url),
    "utf8"
  );
  const canonical = html.match(
    /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/
  )?.[1];
  if (canonical !== new URL("/", url).href) {
    errors.push(
      "The build does not use the configured domain. Rebuild before deploying."
    );
  }
  const info = JSON.parse(
    await readFile(new URL("../dist/build-info.json", import.meta.url), "utf8")
  );
  if (info.site !== url.href)
    errors.push(
      "The artifact domain does not match site.url. Rebuild before deploying."
    );
  if (info.dirty || !info.revision) {
    process.stderr.write(
      "Warning: this local build has no clean source revision. Use the CI artifact for a reproducible release.\n"
    );
  }
}
if (errors.length) {
  process.stderr.write(`${errors.join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write("Release domain configuration is ready.\n");
}
