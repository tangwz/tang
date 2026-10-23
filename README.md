# Terence Tang · Creator Theme

**English** | [简体中文](README.zh-CN.md)

An Astro theme for writing, videos, and a personal portfolio.

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-2F3741?style=for-the-badge)](LICENSE)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/home-dark.png" />
  <img src="docs/images/home-light.png" alt="Terence Tang homepage with a personal introduction and a link to the portfolio" />
</picture>

**[Features](#-features)** · **[Getting started](#-getting-started)** · **[Documentation](#-documentation)** · **[Deployment](#-build-and-deploy)**

## ✨ Features

- [x] **Homepage and portfolio** — A personal introduction, featured work, category filters, and pagination with filter state saved in the URL.
- [x] **English and Chinese** — English at the root and Chinese under `/zh/`, with paired translations, fallback content, and language switching.
- [x] **Light and dark themes** — Follow the system preference or switch manually, with layouts for mobile and desktop.
- [x] **Markdown and MDX** — Validated content schemas, a table of contents, syntax highlighting, code copying, tables, footnotes, and image previews.
- [x] **LaTeX math** — Inline and display equations rendered to SVG at build time, with no extra rendering scripts in the browser.
- [x] **Bilibili videos and transcripts** — Support for BV/AV identifiers, full video URLs, and multipart videos; short links open on Bilibili.
- [x] **Search and discovery** — Static full-text search with Pagefind, tags, archives, and RSS feeds for each language.
- [x] **Sharing and SEO** — Canonical URLs, hreflang, a sitemap, and dynamic Open Graph images with Chinese text support.
- [x] **Publishing controls** — Drafts, sample labels, and scheduled content evaluated at build time.
- [x] **Newsletter pages** — A public letter archive and a subscription form that can be connected to an email provider.

> The repository includes clearly labeled sample content and still uses `example.com` as its site URL. Newsletter subscriptions are disabled by default; the course page presents a planned outline.

## 🚀 Getting started

Use **Node.js 24** and **pnpm 11.3.0** to match CI. The minimum supported Node.js version is `22.12.0`.

```sh
git clone https://github.com/tangwz/tang.git
cd tang
pnpm install --frozen-lockfile
pnpm dev
```

Visit [localhost:4321](http://localhost:4321) for English or [localhost:4321/zh/](http://localhost:4321/zh/) for Chinese.

Search requires an index generated during the build. To preview the complete search experience:

```sh
pnpm build
pnpm preview
```

## 📁 Project structure

```text
.
├── docs/
│   ├── GUIDE.md              # Configuration and content guide (English)
│   ├── GUIDE.zh-CN.md        # Configuration and content guide (Chinese)
│   ├── RELEASE.md            # Deployment and rollback (English)
│   └── RELEASE.zh-CN.md      # Deployment and rollback (Chinese)
├── public/                  # Static images and favicon
├── src/
│   ├── assets/              # Local fonts, icons and images
│   ├── components/          # Shared UI components
│   ├── content/
│   │   ├── posts/           # Markdown and MDX articles
│   │   └── videos/          # Videos and transcripts
│   ├── data/                # Profile, books, courses and letters
│   ├── i18n/                # Translations and locale helpers
│   ├── layouts/             # Page and article layouts
│   ├── pages/               # Routes, including /zh/
│   ├── styles/              # Theme and reading styles
│   ├── utils/               # Content, search and build helpers
│   ├── views/               # Page views shared by both languages
│   └── content.config.ts    # Content schemas
├── scripts/                 # Build and release checks
├── astro-paper.config.ts    # Site configuration
└── astro.config.ts          # Astro integrations and fonts
```

Place Chinese translations in the `zh/` subdirectory of the corresponding article or video directory, using the same filenames as their English counterparts.

## 📖 Documentation

| Topic                                                          | Start here                                                               |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Site configuration, publishing, and translation rules          | [User guide](docs/GUIDE.md)                                              |
| Profile, content, and page styling                             | [Theme configuration example](src/content/posts/theme-configuration.mdx) |
| Headings, code, tables, and math typography                    | [Markdown showcase](src/content/posts/markdown-showcase.mdx)             |
| Domain setup, Newsletter integration, deployment, and rollback | [Release guide](docs/RELEASE.md)                                         |
| The original theme and upstream documentation                  | [AstroPaper repository](https://github.com/satnaing/astro-paper)         |

With the development server running, read the [theme configuration guide](http://localhost:4321/posts/theme-configuration/) and [Markdown showcase](http://localhost:4321/posts/markdown-showcase/) on the site.

## ⚙️ Customization

Start with your site settings, profile, and first article:

| Content                                              | Location                                                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Domain, title, author, pagination, and feature flags | [`astro-paper.config.ts`](astro-paper.config.ts)                                                            |
| Portrait, book notes, courses, and Newsletter name   | [`src/data/creator.ts`](src/data/creator.ts)                                                                |
| Public Newsletter letters                            | [`src/data/letters.ts`](src/data/letters.ts)                                                                |
| Articles and video transcripts                       | [`src/content/posts/`](src/content/posts/) · [`src/content/videos/`](src/content/videos/)                   |
| Homepage introduction and personal story             | [`src/views/Home.astro`](src/views/Home.astro) · [`src/views/About.astro`](src/views/About.astro)           |
| Chinese interface text                               | [`src/i18n/messages/zh.json`](src/i18n/messages/zh.json) · [`src/i18n/lang/zh.json`](src/i18n/lang/zh.json) |
| Colors, homepage layout, and reading styles          | [`src/styles/`](src/styles/)                                                                                |

Public subscription settings are listed in [`.env.example`](.env.example). The form appears only when all required values are present and valid. See [Newsletter integration](docs/RELEASE.md#before-enabling-newsletter) for provider fields, confirmation emails, and unsubscribe flows.

## 🧰 Tech stack

| Purpose                   | Technology                              |
| ------------------------- | --------------------------------------- |
| Static site and content   | Astro · TypeScript · Markdown / MDX     |
| Styling                   | Tailwind CSS · Custom CSS               |
| Full-text search          | Pagefind                                |
| Math                      | remark-math · MathJax                   |
| Dynamic Open Graph images | Satori · Sharp · Astro Fonts            |
| Code quality              | ESLint · Prettier · Node.js test runner |
| Continuous integration    | GitHub Actions                          |

See [`package.json`](package.json) and the lockfile for dependency versions. English pages use local Fraunces and Arimo fonts; Chinese pages use system font stacks. Chinese Open Graph images use local Noto Sans SC.

## 🧞 Commands

Run all commands from the project root.

| Command              | Action                                                                          |
| -------------------- | ------------------------------------------------------------------------------- |
| `pnpm dev`           | Start the local development server                                              |
| `pnpm build`         | Run type checks, build the site, generate the search index, and validate output |
| `pnpm preview`       | Preview the built site                                                          |
| `pnpm test`          | Run unit tests                                                                  |
| `pnpm lint`          | Check code with ESLint                                                          |
| `pnpm format:check`  | Check formatting                                                                |
| `pnpm format`        | Format files                                                                    |
| `pnpm sync`          | Sync Astro types                                                                |
| `pnpm check:build`   | Validate an existing build                                                      |
| `pnpm build:release` | Validate the production domain and create a release build                       |

## 📦 Build and deploy

The build output is written to `dist/` and can be deployed to a static hosting provider. Replace the placeholder domain, profile, and sample content before running `pnpm build:release`; this command rejects placeholder domains. Scheduled content requires a new build at publication time.

[CI](.github/workflows/ci.yml) runs lint, unit tests, formatting checks, and a full build. It retains static artifacts named by commit SHA for 14 days. `dist/build-info.json` records the version and source revision for release tracking and rollback.

No hosting provider or automatic deployment is configured yet. See the [release guide](docs/RELEASE.md) for the full process.

## 📜 Credits and license

Thanks to [Sat Naing](https://satnaing.dev) and the [AstroPaper contributors](https://github.com/satnaing/astro-paper/graphs/contributors) for the theme foundation, and to [Ali Abdaal](https://aliabdaal.com/) for the personal website design inspiration.

The code retains the upstream copyright notice under the [MIT License](LICENSE). Fonts use their respective SIL Open Font Licenses; see [`src/assets/fonts/`](src/assets/fonts/). Image sources are listed in [`public/images/CREDITS.txt`](public/images/CREDITS.txt).
