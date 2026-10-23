# Release guide

**English** | [简体中文](RELEASE.zh-CN.md)

[README](../README.md) · [User guide](GUIDE.md)

The production domain, hosting provider, and Newsletter service are not configured yet. Regular preview builds work; `pnpm build:release` rejects `example.com`, local domains, and non-HTTPS URLs to prevent placeholder canonical URLs, RSS feeds, and sharing links from being published as a production site.

## After choosing a domain

1. Set `site.url` in `astro-paper.config.ts` to the real HTTPS domain.
2. Replace the profile, photographs, sample articles, and video links. The two public Markdown and configuration examples may remain; remove the `sample` label from your own finished content.
3. Keep Newsletter subscriptions disabled until an email provider is connected. Subscriptions are not required to launch the site.
4. Review both languages, reading links, and video assets. Commit the changes so the release artifact corresponds to a known revision.
5. Create a release build and deploy the complete `dist/` directory to your static hosting provider.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm format:check
pnpm build:release
pnpm preview
```

Do not use the development server in production. The hosting provider must serve directory pages, PNGs, XML, and Pagefind files. Unknown URLs should return `404.html` with HTTP status 404; do not rewrite every path to the homepage. Rebuild after changing the domain, public environment variables, or publication times.

## Launch verification

| Page or feature                     | What to check                                                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `/` and `/zh/`                      | Name, photograph, introduction, fonts, navigation, themes, and mobile layout                                                  |
| `/works/` and `/zh/works/`          | Search entry, category filters, pagination, reloads, and back/forward navigation                                              |
| Markdown and configuration examples | Table of contents, translated anchors, code copying, math in both themes and on mobile, tables, footnotes, and image previews |
| Video details                       | Real playback, multipart parameters, external links, and transcripts; no autoplay                                             |
| Sharing and indexing                | Canonical URLs, hreflang, English/Chinese Open Graph images, RSS, and sitemap use the real domain                             |
| Legacy theme tutorials              | Direct access works, robots metadata specifies `noindex`, and pages stay out of public lists and the sitemap                  |
| Newsletter and privacy              | No email field while disabled; consent, confirmation, unsubscribe, and deletion requests work when enabled                    |
| 404                                 | Unknown URLs return HTTP 404 and provide a way back to the homepage                                                           |

Check layouts at 320px, 768px, and desktop widths. Keyboard navigation should reach the navigation links, search, theme switch, filters, table of contents, and forms. After launch, measure these page types with Lighthouse or Web Vitals; the upstream theme's scores do not represent this site.

## Before enabling Newsletter

The four required values are listed in `.env.example`: the public form action URL, provider name, provider privacy policy URL, and public contact email. The form renders only when all four are configured. Invalid HTTPS URLs or contact email formats stop the build.

The form submits `email`, `interest`, and required `consent`. Provider fields may differ, so adapt them to the actual service. Use your own test email address to verify that:

- A new subscription enters a pending-confirmation state, and the confirmation email and link work.
- Duplicate addresses, invalid addresses, and submission failures produce clear results.
- Every Newsletter includes a working unsubscribe link, and unsubscribed addresses receive no further mail.
- The public contact address can handle deletion requests, and the privacy statement matches the actual workflow.

Keep production subscriptions disabled until the integration and these checks are complete. All `PUBLIC_` values are visible in the browser; email service API secrets do not belong in these settings.

## Artifact provenance and rollback

CI saves a `site-<commit-sha>` artifact. Its `build-info.json` records the version, build time, site URL, actual deployment base, revision, and dirty state. Once a hosting provider is selected, deploy that same static artifact without rebuilding it during deployment.

For deployment under a domain subpath, set `base` in `astro.config.ts`. Build checks use the actual base recorded in the artifact to map URLs to output paths. Sharing images, the sitemap, its URL in `robots.txt`, and RSS links use the same base. English and Chinese RSS channel links point to their respective homepages and include only published articles in that language, excluding untranslated fallback pages.

Keep the last production artifact and its revision. To roll back, redeploy the previous verified artifact in full or use the hosting provider's deployment rollback feature. Do not mix HTML and Pagefind indexes from different builds. CI retains artifacts for 14 days by default; longer retention belongs in the hosting platform or a release archive.

DNS, HTTPS, caching rules, automatic deployment credentials, and production 404 verification can be completed after the domain and hosting provider are chosen. This repository does not assume a particular provider or create an external deployment.
