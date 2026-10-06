import assert from "node:assert/strict";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import config from "../astro-paper.config.ts";
import { getMathErrors } from "../src/utils/mathValidation.ts";

const root = new URL("../dist/", import.meta.url);
const site = new URL(config.site.url);
const errors = [];
const decode = value => value.replace(/&amp;/g, "&");
const exists = async url =>
  stat(url).then(
    value => value.isFile(),
    () => false
  );

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(entry => {
      const url = new URL(entry.name, dir);
      return entry.isDirectory() ? walk(new URL(`${entry.name}/`, dir)) : [url];
    })
  );
  return nested.flat();
}

const htmlFiles = (await walk(root)).filter(url =>
  url.pathname.endsWith(".html")
);
const htmlByPath = new Map();
const pathFor = file => {
  const relative = fileURLToPath(file).slice(fileURLToPath(root).length);
  return `/${relative.replace(/index\.html$/, "")}`;
};
for (const file of htmlFiles)
  htmlByPath.set(pathFor(file), await readFile(file, "utf8"));
const noindex = html =>
  /<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html);

for (const [path, html] of htmlByPath) {
  errors.push(...getMathErrors(html).map(message => `${message}: ${path}`));
  const canonical = html.match(
    /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/
  )?.[1];
  if (!canonical) errors.push(`Missing canonical: ${path}`);
  if (noindex(html)) continue;
  const language = path.startsWith("/zh/") ? "zh" : "en";
  if (html.includes('class="newsletter-unavailable"')) {
    if (!html.includes('class="newsletter-closed-label"'))
      errors.push(`Missing closed-subscription label: ${path}`);
    if (html.includes('name="email"'))
      errors.push(`Closed newsletter still collects email: ${path}`);
  }
  if (!html.includes(`lang="${language}"`))
    errors.push(`Incorrect page language: ${path}`);
  if (!/<meta\b[^>]*name="description"[^>]*content="[^"]+"/.test(html))
    errors.push(`Missing description: ${path}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = decode(match[1]);
    if (!value.startsWith("/") || value.startsWith("//")) continue;
    const url = new URL(value, site);
    const target = decodeURIComponent(url.pathname).replace(/^\//, "");
    const direct = new URL(target, root);
    const index = new URL(
      `${target.replace(/\/+$/, "")}/index.html`.replace(/^\//, ""),
      root
    );
    if (!(await exists(direct)) && !(await exists(index)))
      errors.push(`Broken local URL on ${path}: ${value}`);
  }
  const social = html.match(
    /<meta\b[^>]*property="og:image"[^>]*content="([^"]+)"/
  )?.[1];
  if (social) {
    const image = new URL(decode(social));
    if (
      image.origin === site.origin &&
      !(await exists(new URL(image.pathname.slice(1), root)))
    )
      errors.push(`Missing social image: ${path}`);
  }
}

const sitemap = await readFile(new URL("sitemap-0.xml", root), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  match => new URL(decode(match[1]))
);
for (const url of urls) {
  const html = htmlByPath.get(url.pathname);
  if (!html || noindex(html))
    errors.push(`Non-indexable sitemap URL: ${url.pathname}`);
  if (url.origin !== site.origin)
    errors.push(`Wrong sitemap origin: ${url.href}`);
}
for (const [path, html] of htmlByPath) {
  if (!noindex(html) && !urls.some(url => url.pathname === path))
    errors.push(`Missing sitemap URL: ${path}`);
}
for (const prefix of ["", "zh/"]) {
  for (const page of [
    "",
    "works/",
    "newsletter/",
    "privacy/",
    ...(config.features?.search === false ? [] : ["search/"]),
  ]) {
    assert.ok(
      htmlByPath.has(`/${prefix}${page}`),
      `Missing bilingual route: /${prefix}${page}`
    );
  }
  const rss = await readFile(new URL(`${prefix}rss.xml`, root), "utf8");
  for (const match of rss.matchAll(/<link>(.*?)<\/link>/g)) {
    if (new URL(decode(match[1])).origin !== site.origin)
      errors.push(`Wrong RSS origin: ${prefix}rss.xml`);
  }
}
assert.ok(
  await exists(new URL("404.html", root)),
  "Missing static host fallback: 404.html"
);
if (config.features?.search !== false)
  assert.ok(
    await exists(new URL("pagefind/pagefind.js", root)),
    "Missing Pagefind production index"
  );
if (errors.length) throw new Error(errors.join("\n"));

let revision = null;
let dirty = true;
try {
  dirty = Boolean(
    execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim()
  );
  revision = dirty
    ? null
    : execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
} catch {
  /* Source archives may not include Git metadata. */
}
const pkg = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8")
);
await writeFile(
  new URL("build-info.json", root),
  `${JSON.stringify({ name: pkg.name, version: pkg.version, site: site.href, revision, dirty, builtAt: new Date().toISOString() }, null, 2)}\n`
);
process.stdout.write(
  `Static output validated: ${htmlFiles.length} HTML pages, ${urls.length} indexable URLs.\n`
);
